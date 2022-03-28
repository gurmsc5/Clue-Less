# Clue-Less
Foundations of Software Engineering project
The clue-less-backend provides RESTful API services of user login, game session management, game play. 

# 
The application is developed with:
- Java16
- Springboot framework
The application is build with;
- Maven


# running envrionment
The Sprintboot framework can be run within Intellj IDE directly.
The application can be built and run on any envrionment that provides sufficient dependencies.

# direction of using Intellj
- Download and install Intellj on your working platform
- Download the clue-less-backend repository to your working platform
- Open the project in Intellj by selecting the folder of clue-less-backend, wait for the Maven project to be processed in the IDE.
- locate the main Class: clue-less-backend/src/main/java/com/jhu/Clueless/CluelessApplication.java
- run the Class: CluelessApplication.java

# You should see something like the followings in your IDE terminal output:
19:39:18.281 [Thread-0] DEBUG org.springframework.boot.devtools.restart.classloader.RestartClassLoader - Created RestartClassLoader org.springframework.boot.devtools.restart.classloader.RestartClassLoader@44eaac04

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v2.6.3)

2022-03-28 19:39:18.689  INFO 112576 --- [  restartedMain] com.jhu.Clueless.CluelessApplication     : Starting CluelessApplication using Java 16 on DESKTOP-C1OVKJ8 with PID 112576 (G:\Clue-Less\clue-less-backend\target\classes started by kzn456 in G:\Clue-Less\clue-less-backend)
2022-03-28 19:39:18.690  INFO 112576 --- [  restartedMain] com.jhu.Clueless.CluelessApplication     : No active profile set, falling back to default profiles: default
2022-03-28 19:39:18.754  INFO 112576 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : Devtools property defaults active! Set 'spring.devtools.add-properties' to 'false' to disable
2022-03-28 19:39:18.754  INFO 112576 --- [  restartedMain] .e.DevToolsPropertyDefaultsPostProcessor : For additional web related logging consider setting the 'logging.level.web' property to 'DEBUG'
2022-03-28 19:39:19.882  INFO 112576 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8088 (http)
2022-03-28 19:39:19.897  INFO 112576 --- [  restartedMain] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2022-03-28 19:39:19.897  INFO 112576 --- [  restartedMain] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.56]
2022-03-28 19:39:19.992  INFO 112576 --- [  restartedMain] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2022-03-28 19:39:19.992  INFO 112576 --- [  restartedMain] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 1237 ms
2022-03-28 19:39:20.441  INFO 112576 --- [  restartedMain] o.s.b.d.a.OptionalLiveReloadServer       : LiveReload server is running on port 35729
2022-03-28 19:39:20.492  INFO 112576 --- [  restartedMain] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8088 (http) with context path ''
2022-03-28 19:39:20.501  INFO 112576 --- [  restartedMain] com.jhu.Clueless.CluelessApplication     : Started CluelessApplication in 2.208 seconds (JVM running for 2.737)
Create a gameId:999

