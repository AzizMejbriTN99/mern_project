pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub_credentials')
        BACKEND_IMAGE = "mern-backend:latest"
        FRONTEND_IMAGE = "mern-frontend:latest"
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
                bat "trivy image %BACKEND_IMAGE%"
                bat "trivy image %FRONTEND_IMAGE%"
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub_credentials', 
                    usernameVariable: 'DOCKERHUB_USER', 
                    passwordVariable: 'DOCKERHUB_PASS'
                )]) {
                    bat "docker login -u %DOCKERHUB_USER% -p %DOCKERHUB_PASS%"
                    bat "docker tag %BACKEND_IMAGE% %DOCKERHUB_USER%/%BACKEND_IMAGE%"
                    bat "docker tag %FRONTEND_IMAGE% %DOCKERHUB_USER%/%FRONTEND_IMAGE%"
                    bat "docker push %DOCKERHUB_USER%/%BACKEND_IMAGE%"
                    bat "docker push %DOCKERHUB_USER%/%FRONTEND_IMAGE%"
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