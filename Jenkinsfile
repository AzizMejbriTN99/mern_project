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
                bat "docker build -t %BACKEND_IMAGE% ./backend"
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                bat "docker build -t %FRONTEND_IMAGE% ./hr-frontend"
            }
        }

        stage('Scan Images with Trivy') {
            steps {
                // Using Docker image for Trivy on Windows
                bat "docker run --rm -v //var/run/docker.sock:/var/run/docker.sock aquasec/trivy image %BACKEND_IMAGE%"
                bat "docker run --rm -v //var/run/docker.sock:/var/run/docker.sock aquasec/trivy image %FRONTEND_IMAGE%"
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: '%DOCKERHUB_CREDENTIALS%',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    // Login to Docker Hub
                    bat "docker login -u %USER% -p %PASS%"

                    // Tag images for Docker Hub (Windows-friendly format)
                    bat "docker tag %BACKEND_IMAGE% %DOCKERHUB_USERNAME%/%BACKEND_IMAGE%:latest"
                    bat "docker tag %FRONTEND_IMAGE% %DOCKERHUB_USERNAME%/%FRONTEND_IMAGE%:latest"

                    // Push images
                    bat "docker push %DOCKERHUB_USERNAME%/%BACKEND_IMAGE%:latest"
                    bat "docker push %DOCKERHUB_USERNAME%/%FRONTEND_IMAGE%:latest"
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
