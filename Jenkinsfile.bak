pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = '1a247a59-ccdd-4f03-b31c-eddcf5036cd2'
        DOCKERHUB_USERNAME = 'medazizmejbri'
        BACKEND_IMAGE = "mern-backend"
        FRONTEND_IMAGE = "mern-frontend"
    }

    stages {

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

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
                    // Windows: run Trivy via Docker
                    bat "docker run --rm -v //var/run/docker.sock:/var/run/docker.sock aquasec/trivy image ${BACKEND_IMAGE}:latest"
                    bat "docker run --rm -v //var/run/docker.sock:/var/run/docker.sock aquasec/trivy image ${FRONTEND_IMAGE}:latest"
                }
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', "${DOCKERHUB_CREDENTIALS}") {
                        // tag images with your Docker Hub username
                        docker.image("${BACKEND_IMAGE}:latest").tag("${DOCKERHUB_USERNAME}/${BACKEND_IMAGE}:latest").push()
                        docker.image("${FRONTEND_IMAGE}:latest").tag("${DOCKERHUB_USERNAME}/${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
