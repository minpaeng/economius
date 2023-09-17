pipeline {
    agent any
    stages {
        stage("Set Variable") {
            steps {
                script {
                    IMAGE_NAME_BE = "economius-backend"
                    IMAGE_NAME_FE = "economius-frontend"
                    APPLICATION_YML_PATH = "settings/application.yml" 
                    CONTAINER_NAME_BE = "economius_be"
                    CONTAINER_NAME_FE = "economius_fe"
                    PROJECT_DIR_BE = "backend/economius"
                    PROJECT_DIR_FE = "frontend/economius"
                }
            }
        }

        stage("Copy yml") {
            steps {
                sh "mkdir -p ${PROJECT_DIR_BE}/src/main/resources"  // 디렉터리 생성
                sh "cp ${APPLICATION_YML_PATH} ${PROJECT_DIR_BE}/src/main/resources/"
            }
        }

        stage("BE Build") {
            steps {
                sh """
                cd ${PROJECT_DIR_BE}
                chmod 777 ./gradlew
                ./gradlew clean build
                """
            }
        }

        stage("Container Cleaning") {
            steps {
                sh "docker ps -q -f name=${CONTAINER_NAME_BE} | xargs --no-run-if-empty docker container stop"
                sh "docker container ls -a -q -f name=${CONTAINER_NAME_BE} | xargs --no-run-if-empty docker container rm"

                sh "docker ps -q -f name=${CONTAINER_NAME_FE} | xargs --no-run-if-empty docker container stop"
                sh "docker container ls -a -q -f name=${CONTAINER_NAME_FE} | xargs --no-run-if-empty docker container rm"
            }
        }


        stage("image cleaning") {
            steps{
                sh "docker images ${IMAGE_NAME_BE} -q | xargs -r docker rmi -f"
                sh "docker images ${IMAGE_NAME_FE} -q | xargs -r docker rmi -f"
            }
        }

        stage("Docker Image Build") {
            steps {
                dir("${PROJECT_DIR_BE}") {
                    script {
                        sh "docker build --no-cache -t ${IMAGE_NAME_BE} ."
                    } 
                }
                dir("${PROJECT_DIR_FE}") {
                    script {
                        sh "docker build --no-cache -t ${IMAGE_NAME_FE} ."
                    } 
                }
            }
        }

        stage("Docker Container Run") {
            steps {
                sh "docker run -d -p 8080:8080 --name ${CONTAINER_NAME_BE} ${IMAGE_NAME_BE}"
                sh "docker run -d -p 3000:3000 --name ${CONTAINER_NAME_FE} ${IMAGE_NAME_FE}"
            }
        }
    }
}
