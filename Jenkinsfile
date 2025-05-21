pipeline {
    agent any

    environment {
        IMAGE_NAME = 'pradeepv2006/booking'
        DOCKERHUB_CREDENTIALS = 'dockerhub-credentials' // Set this in Jenkins credentials
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/PRADEEP-VELLIRASAN/Travel_Booking'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: "${DOCKERHUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                        sh "docker push ${IMAGE_NAME}"
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                // You can SSH to your server and run deploy.sh, or use another deployment strategy
                // Example (requires SSH credentials setup in Jenkins):
                // sh 'ssh user@your-server "cd /path/to/app && ./deploy.sh"'
                echo 'Deploy stage - customize as needed for your environment'
            }
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
