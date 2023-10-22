FROM eclipse-temurin:21-jre-alpine AS build
WORKDIR /tmp
COPY . ./
RUN ./gradlew bootJar

FROM eclipse-temurin:21-jre-alpine
WORKDIR /home/server/write/spring
COPY --from=build /tmp/build build
ENTRYPOINT ["java", "-jar", "build/libs/spring-0.0.1-SNAPSHOT.jar"]
