FROM openjdk:11-jdk

COPY build/libs/*.jar application.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar", "application.jar"]
