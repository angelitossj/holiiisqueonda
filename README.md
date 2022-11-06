# modeloExamen

  

  

Uso de Nodejs y Express para Servidor



Para ejecutar se debe tener instalado Node.js y npm.
![enter image description here](https://miro.medium.com/max/1200/1*yYN3pRB9mGS-IG_-agqDvA.png)
Para Instalar las dependencias:

npm i


Para ejecutar el proyecto en modo Desarrollo, ejecutar el siguiente comando:

npm run nodemon

Para el proyecto en modo Producción, ejecutar el siguiente comando:

npm start




![enter image description here](https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/777184/secure-rest-api-in-nodejs-18f43b3033c239da5d2525cfd9fdc98f.png)

  
  

Pasos:

  
  

comenzar es registrarte como usuario:

HTTP: POST :http://localhost:3000/usuario

=> requiere del siguiente body:

{

"usuario":"angelitossj",

"password":"xxxxxxxxx",

"email":"Email Válido(xxxx@xxxx.com)"

}

  
  

iniciar sesión para acceder a las funciones:

HTTP: POST: http://localhost:3000/login

<<<<<<< HEAD
Una vez recibido el Token, 
cópie y uselo como header - Authorization y así acceder a las funciones:
=======
=> requiere del siguiente body:

{

"usuario":"angelitossj",

"password":"xxxxxx"

}

  

Una vez recibido el Token,

cópielo y uselo como header Authorization y así acceder a las funciones:
>>>>>>> c51491ec40e9c1ad606257a6714b1e9f70d759fe

  

HTTP: GET: http://localhost:3000/usuario

Sirve para ver la información de tu cuenta.

HTTP: DELETE: http://localhost:3000/usuario

En caso de que quieras eliminar la cuenta.

Funciones de Tareas con el Token:

HTTP: GET: http://localhost:3000/tarea

Mostraría todas las tareas existentes en la Base de Datos:

HTTP: GET http://localhost:3000/tarea/:idTarea
<<<<<<< HEAD
Para tener en cuenta; Para obtener el :idTarea preferiblemente que haga un GET de las tareas ( /tarea/usuario) y copie el id de la tarea que desea modificar:
=======

Para tener en cuenta; Para obtener el :idTarea preferiblemente que  un realice un GET de las tareas ( /tarea/usuario) y copie el "_id" de la tarea que desea modificar:
  

comenzar es registrarte como usuario:

HTTP: POST :http://localhost:3000/usuario

=> requiere del siguiente body:

{

"usuario":"angelitossj",

"password":"xxxxxxxxx",

"email":"Email Válido(xxxx@xxxx.com)"

}

  
  

iniciar sesión para acceder a las funciones:

HTTP: POST: http://localhost:3000/login

=> requiere del siguiente body:

{

"usuario":"angelitossj",

"password":"xxxxxx"

}

  

Una vez recibido el Token,

cópielo y uselo como header Authorization y así acceder a las funciones:

  

HTTP: GET: http://localhost:3000/usuario

Sirve para ver la información de tu cuenta.

HTTP: DELETE: http://localhost:3000/usuario

En caso de que quieras eliminar la cuenta.

Funciones de Tareas con el Token:

HTTP: GET: http://localhost:3000/tarea

Mostraría todas las tareas existentes en la Base de Datos:

HTTP: GET http://localhost:3000/tarea/:idTarea

Para tener en cuenta; Para obtener el :idTarea preferiblemente que  un realice un GET de las tareas ( /tarea/usuario) y copie el "id" de la tarea que desea modificar:
>>>>>>> c51491ec40e9c1ad606257a6714b1e9f70d759fe
