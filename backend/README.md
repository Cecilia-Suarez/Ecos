# Ecos - Backend

## 🛠 Tecnologías 

[![Tecnologías](https://skillicons.dev/icons?i=java,spring,maven,postgres,docker)](https://skillicons.dev)

## 📌 Instrucciones para ejecutar localmente

Este proyecto puede ejecutarse de dos maneras:
- **Usando Docker**, lo cual es la opción más rápida y sencilla.
- **Instalando y configurando localmente**, para mayor flexibilidad en el desarrollo.

### 🐳 Ejecutar con Docker

#### Requisitos previos

- Docker
- Docker Compose

#### Pasos para ejecutar

1. Ubicarse en el directorio del proyecto:

    ```bash
    cd <NOMBRE_DEL_PROYECTO>
    ```

2. Configurar las variables de entorno necesarias

    Puedes tomar como referencia el archivo `.env.example`.

3. Ejecutar el comando para levantar los contenedores:

    ```bash
    docker-compose up --build
    ```

### ⚙️ Ejecutar localmente

#### Requisitos previos

- Maven instalado
- Java 17 instalado
- PostgreSQL configurado

#### Pasos para ejecutar

1. Ubicarse en el directorio del proyecto:

    ```bash
    cd <NOMBRE_DEL_PROYECTO>
    ```

2. Construir el proyecto con Maven:

    ```bash
    mvn clean install
    ```

3. Configurar las variables de entorno necesarias

    Puedes tomar como referencia el archivo `.env.example`.

4. Ejecutar la aplicación:

    ```bash
    mvn spring-boot:run
    ```

## 📂 Estructura del Proyecto

```text
src/
│── main/
│   ├── java/
│   │   ├── com/
│   │   │   └── footalentgroup/
│   │   │       ├── configuration/
│   │   │       │   └── SecurityConfig.java
│   │   │       ├── controllers/
│   │   │       │   └── NameController.java
│   │   │       ├── exceptions/
│   │   │       │   ├── GlobalExceptionHandler.java
│   │   │       │   ├── ErrorResponse.java
│   │   │       │   └── NameException.java
│   │   │       ├── models/
│   │   │       │   ├── dtos/
│   │   │       │   │   ├── mapper/
│   │   │       │   │   │   └── NameMapper.java
│   │   │       │   │   ├── request/
│   │   │       │   │   │   └── NameRequestDto.java
│   │   │       │   │   ├── response/
│   │   │       │   │   │   └── NameResponseDto.java
│   │   │       │   ├── enums/
│   │   │       │   ├── entities/
│   │   │       │   │   └── NameEntity.java
│   │   │       ├── repositories/
│   │   │       │   └── NameRepository.java
│   │   │       ├── services/
│   │   │       │   ├── impl/
│   │   │       │   │   └── NameServiceImpl.java
│   │   │       │   └── NameService.java
│   │   │       ├── validators/
│   │   │       │   ├── impl/
│   │   │       │   │   └── NameValidator.java
│   │   │       │   └── Name.java
│   │   │       ├── Application.java
│   ├── resources/
│   │   ├── application.properties
│── test/
│   ├── java/
│   │   ├── com/
│   │   │   └── footalentgroup/
│   │   │       ├── controllers/
│   │   │       │   └── RestTestConfig.java
│   │   │       ├── repositories/
│   │   │       ├── services/
│   │   │       ├── TestConfig.java
│   ├── resources/
│   │   └── test.properties
```

## 🤝 Buenas prácticas para contribuir

### ⌨️ Comandos clave de Git

Aquí están algunos comandos esenciales para mantener un flujo de trabajo limpio:

```bash
# Obtener los últimos cambios sin generar commits adicionales
git pull origin <rama> --rebase  

# Fusionar una rama sin generar commits adicionales
git merge --no-ff <rama>

# Sincronizar cambios con el repositorio remoto
git push origin <rama>  

# Crear una nueva rama y cambiar a ella
git switch -c <rama>  
```

### 📝 Mensajes de Commits

Es importante seguir una convención clara para los mensajes de commit. Usa la siguiente estructura:

```text
tipo_commit(backend): Descripción breve y clara. #issue
```

### 🔄 Flujo de trabajo recomendado

1. Crear una nueva rama basada en `backend`:
   
   ```bash
   git switch -c <rama>
   ```

2. Realizar los cambios y hacer commit siguiendo la convención establecida.
  
3. Actualizar la rama con los últimos cambios de backend antes de hacer push:
   
    ```bash
    git pull origin backend --rebase
    ```

4. Subir la rama al repositorio remoto:

    ```bash
    git push origin <rama>
    ```

5. Crear una Pull Request en GitHub y solicitar revisión.

## 🌐 Deploy y Documentación

- **Deploy**: [Enlace al sitio en producción](https://ecos-ed30.onrender.com)
- **Swagger**: [Documentación API](https://ecos-ed30.onrender.com/swagger-ui/index.html)