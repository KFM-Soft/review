FROM maven:3.8-eclipse-temurin-17-alpine AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package -Pprod -Dmaven.test.skip=true

FROM eclipse-temurin:21-jdk-alpine
COPY --from=build /home/app/target/back-end.jar /home/app/back-end.jar
ENV PORT 9000
EXPOSE 9000
CMD java -jar /home/app/back-end.jar