pipeline {
    agent any
    stages {
        stage("Set Variable") {
            steps {
                script {
                    echo "Setting Variables..." 
                    IMAGE_NAME_FE = "economius-frontend" 
                    APPLICATION_ENV_PATH = "settings/.env"  
                    CONTAINER_NAME_FE = "economius_fe" 
                    PROJECT_DIR_FE = "frontend/economius"
                    echo "Variables set."
                }
            }
        }
 
 
        stage("Copy env") {
            steps {
                echo "Current PATH: ${env.PATH}"
                sh "cp ${APPLICATION_ENV_PATH} ${PROJECT_DIR_FE}"
            }
        }

        stage("Container Cleaning") {
            steps {
                echo "Current PATH: ${env.PATH}"  
                sh "docker ps -q -f name=${CONTAINER_NAME_FE} | xargs --no-run-if-empty docker container stop"
                sh "docker container ls -a -q -f name=${CONTAINER_NAME_FE} | xargs --no-run-if-empty docker container rm"
            }
        }

        stage("image cleaning") {
            steps {
                echo "Current PATH: ${env.PATH}" 
                sh "docker images ${IMAGE_NAME_FE} -q | xargs -r docker rmi -f"
            }
        }

        stage("Docker Image Build") {
            steps {
                echo "Current PATH: ${env.PATH}" 
                dir("${PROJECT_DIR_FE}") {
                    script {
                        echo "Current FE PATH: ${env.PATH}"
                        sh "docker build --no-cache -t ${IMAGE_NAME_FE} ."
                    } 
                }
            }
        }

        stage("Docker Container Run") {
            steps {
                echo "Current PATH: ${env.PATH}" 
                sh "docker run -d -p 3000:3000 --name ${CONTAINER_NAME_FE} ${IMAGE_NAME_FE}"
            }
        }
    }
}
