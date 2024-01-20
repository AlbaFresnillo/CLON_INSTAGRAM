#INSTAHAB APP

### PROGRAMADORES

Jazmín Durand Chávez Alba Fresnillo Arévalo Miryam Miravalles Zapata 
### CARACTERÍSTICAS DEL PROYECTO

 App de fotos (clon de Instagram).

### DESCRIPCIÓN:
 Implementar una API que permita publicar fotos (añadiendo o no textos) y que otras personas puedan verlas.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Guardar el archivo `.env.example` como `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initDB` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

## Base de datos

### users

| Campo            | Tipo         | Descripción                            |
| ---------------- | ------------ | -------------------------------------- |
| id               | VARCHAR(36)  | Identificador único del usuario        |
| email            | VARCHAR(100) | Correo electrónico del usuario         |
| username         | VARCHAR(30)  | Nombre de usuario del usuario          | 
| password         | VARCHAR(100) | Contraseña del usuario (hash)          |
| avatar           | VARCHAR(100) | URL del avatar del usuario             |
| role             | ENUM         | Rol del usuario ("admin" o "normal")   |
| active           | BOOLEAN      | Indica si el usuario está activo o no  |
| registrationCode | VARCHAR(36)  | Código de registro del usuario         |
| recoverPassCode  | VARCHAR(36)  | Código de recuperación de contraseña   |
| createdAt        | DATETIME     | Fecha y hora de creación del usuario   |
| modifiedAt       | DATETIME     | Fecha y hora de la última modificación |

### reels

| Campo       | Tipo         | Descripción                            |
| ----------- | ------------ | -------------------------------------- |
| id          | INTEGER (10) | Identificador único del reel           |
| text        | VARCHAR(100) | Texto para el reel                     |
| likes       | DOUBLE(0)    | Total de likes                         |
| idUser      | VARCHAR(36)  | Identificador del usuario creador      |
| createdAt   | DATETIME     | Fecha y hora de creación del reel      |

### reelPhotos

| Campo     | Tipo         | Descripción                                            |
| --------- | ------------ | ------------------------------------------------------ |
| id        | VARCHAR(36)  | Identificador único de la foto                         |
| name      | VARCHAR(100) | Nombre de la foto                                      |
| reelId    | VARCHAR(36)  | Identificador de la entrada a la que pertenece la foto |
| createdAt | DATETIME     | Fecha y hora de creación de la foto                    |

### likes

| Campo     | Tipo        | Descripción                        |
| --------- | ----------- | ---------------------------------- |
| id        | VARCHAR(36) | Identificador único del reel       |
| value     | DOUBLE (0)  | Valor total de los likes           |
| reelId    | VARCHAR(36) | Identificador del reel             |
| userId    | VARCHAR(36) | Identificador del usuario que dio like |
| createdAt | DATETIME    | Fecha y hora de creación del like  |

## Endpoints del usuario

-   **POST** - `/users/register` - Crea un nuevo usuario pendiente de activar.
-   **PUT** - `/users/validate/:registrationCode` - Valida a un usuario recién registrado.
-   **POST** - `/users/login` - Logea a un usuario retornando un token.
-   **GET** - `/users/:userId` - Retorna información pública de un usuario (ver el perfil).
-   **GET** - `/users` - Retorna información privada del usuario con el id del token.
-   **PUT** - `/users/avatar` - Permite actualizar el avatar del usuario.
-   **POST** - `/users/password/recover` - Envía al usuario un correo de recuperación de contraseña.
-   **PUT** - `/users/password/reset` - Actualiza la contraseña de un usuario mediante un código de recuperación.

## Endpoints del diario

-   **POST** - `/reels` - Crea un reel.
-   **GET** - `/reels` - Retorna el listado de reels.
-   **GET** - `/reels/:reelId` - Retorna un reel en concreto.
-   **POST** - `/reels/:reelId/photos` - Agregar una foto a un reel.
-   **DELETE** - `/reels/:reelId/photos/:photoId` - Eliminar una foto de un reel.
-   **POST** - `/reels/:reelId/likes` - Like un reel (solo uno por usuario).
-   **DELETE** - `/reels/:reelId` - Eliminar un reel.

