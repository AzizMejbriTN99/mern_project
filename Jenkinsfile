pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub_credentials'
        DOCKERHUB_USERNAME = 'YOUR_DOCKERHUB_USERNAME'
        BACKEND_IMAGE = "mern-backend"
        FRONTEND_IMAGE = "mern-frontend"
    }

    stages {

        stage('Build Backend Docker Image') {
            steps {
                script {
                    docker.build("${BACKEND_IMAGE}:latest", "./backend")
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                script {
                    docker.build("${FRONTEND_IMAGE}:latest", "./hr-frontend")
                }
            }
        }

        stage('Scan Images with Trivy') {
            steps {
                script {
                    sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image ${BACKEND_IMAGE}:latest"
                    sh "docker run --rm -v /var/run/docker.sock:/var/run/docker.sock aquasec/trivy image ${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
                        docker.image("${BACKEND_IMAGE}:latest").push()
                        docker.image("${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }
    }
}