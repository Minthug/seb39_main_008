
```
plugins {
id 'org.springframework.boot' version '2.7.3'
id 'io.spring.dependency-management' version '1.0.13.RELEASE'
id 'java'
}

group = 'com.example'
version = '0.0.1-SNAPSHOT'
sourceCompatibility = '11'
targetCompatibility = '11'

configurations {
compileOnly {
extendsFrom annotationProcessor
}
}

repositories {
mavenCentral()
}
```

```
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.2.4'
    id 'io.spring.dependency-management' version '1.1.4'
    id 'org.flywaydb.flyway' version '9.22.3'
}

apply plugin: 'io.spring.dependency-management'


group = 'com.example'
version = '0.0.1-SNAPSHOT'

java {
    sourceCompatibility = '17'
}

configurations {
    compileOnly {
       extendsFrom annotationProcessor
    }
}

repositories {
    mavenCentral()
}
```
리팩토링 작업을 하기전 
'2.7.3' 버전에서 '3.2.4' 버전으로 변경하였습니다.
그리고 '11' 버전에서 '17' 버전으로 변경하였습니다.
그리고 'org.flywaydb.flyway' 버전을 추가하였습니다.
