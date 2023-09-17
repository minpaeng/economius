pipeline {
    agent any
    stages {
        stage("Set Variable") {
            steps {
                script {
                    echo "Setting Variables..."
                    IMAGE_NAME_BE = "economius-backend" 
                    APPLICATION_YML_PATH = "settings/application.yml" 
                    CONTAINER_NAME_BE = "economius_be" 
                    PROJECT_DIR_BE = "backend/economius" 
                    echo "Variables set."
                }
            }
        }

        stage("Copy yml") {
            steps {
                echo "Current PATH: ${env.PATH}"
                sh "mkdir -p ${PROJECT_DIR_BE}/src/main/resources"  // 디렉터리 생성
                sh "cp ${APPLICATION_YML_PATH} ${PROJECT_DIR_BE}/src/main/resources/"
            }
        }

        stage("BE Build") {
            steps {
                echo "Current PATH: ${env.PATH}"
                sh """
                cd ${PROJECT_DIR_BE}
                chmod 777 ./gradlew
                ./gradlew clean build
                """
            }
        }

        stage("Container Cleaning") {
            steps {
                echo "Current PATH: ${env.PATH}" 
                sh "docker ps -q -f name=${CONTAINER_NAME_BE} | xargs --no-run-if-empty docker container stop"
                sh "docker container ls -a -q -f name=${CONTAINER_NAME_BE} | xargs --no-run-if-empty docker container rm"
            }
        }

        stage("image cleaning") {
            steps {
                echo "Current PATH: ${env.PATH}"
                sh "docker images ${IMAGE_NAME_BE} -q | xargs -r docker rmi -f" 
            }
        }

        stage("Docker Image Build") {
            steps {
                echo "Current PATH: ${env.PATH}"
                dir("${PROJECT_DIR_BE}") {
                    script {
                        echo "Current BE PATH: ${env.PATH}"
                        sh "docker build --no-cache -t ${IMAGE_NAME_BE} ."
                    } 
                }
            }
        }

        stage("Docker Container Run") {
            steps {
                echo "Current PATH: ${env.PATH}"
                sh "docker run -d -p 8080:8080 --name ${CONTAINER_NAME_BE} ${IMAGE_NAME_BE}"
            }
        }
    }
}
