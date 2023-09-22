FROM openjdk:11-jdk

COPY build/libs/*SNAPSHOT.jar application.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar", "-Duser.timezone=Asia/Seoul", "application.jar"]
