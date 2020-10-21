//IMPORTAMOS EXPRESS Y CREAMOS EL SERVIDOR (APP)
var express = require('express')
var app = express()

//MODULO MIDDLEWARES PARA LOGGER DE REGISTROS
var morgan = require('morgan')//solo se definio

/**********************
****CONFIGURACIONES****
***********************/
app.set('appName', 'Curso express');
app.set('port',3000);//CONFIGURAMOS EL PUESTO DE ESCUCHA
app.set('view engine', 'ejs'); //CONFIGURO EL MOTOR DE PLATILLAS QUE SE INSTALO





/******************
****MIDDLEWARES**** MANEJADOR DE PETICION QUE PODEMOS EJECUTAR ANTES DE QUE
******************* DE QUE LLEGUEN A SU RUTA ORIGINAL (funcion global)*/
 function logger(req, res, next) {
   console.log(`Router Received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
   next();
 };

//METODO PARA QUE EXPRESS ENTIENDA LOS OBJECTOS JS O JSON QUE LLEGAN DE LA WEB
app.use(express.json());

//LLAMAMOS LA FUNCION MIDDLEWARES
app.use(logger)


//FUNCION PARA REQUERIR AUTENTICACION PARA RUTAS DEFINIDA (funcion especifica)
app.all('/user', (req, res, next) => {
  console.log('El primero para las rutas user');
  next();
});




/************
****RUTAS**** Solicitud que se le hace al server desde el navegador
*************/


//LLAMAMOS AL MOTOR DE PLANTILAS en la ruta plantilla
app.get('/plantilla', (req, res) => {
  const data = [{name:'Camilo'}, {name:'Andres'}, {name:'Miguel'}, {name:'Pedro'}];//ejemplo mandar datos al fron
  res.render('index.ejs', {data});//Mostramos el contenido dinamico en el navegador
})



//RUTA INICIAL
//METODO GET -> Solicitud para mostrar algo en el navegador
app.post('/', (req, res) => {
  //metodo de respuesta send
  res.send('<h1> GET REQUEST RECEIVED </h1>');
});

//RUTA USER
app.get('/user', (req, res) => {
  //Metodo de respuesta json
  res.json({
    nombre: 'Camilo',
    apellido: 'Moreno',
  });
});


//RUTA ABAUT
//METODO POST -> El navegador envia datos al servidor para almacenar
app.post('/user', (req, res) => {
  //recivimos la pecicion de navegador del body
  console.log(req.body);
  //metodo de respuesta send
  res.send('<h1> POST REQUEST RECEIVED </h1>');
});

//RUTA DINAMICA -> las generamos colocando (:) y nos permite guardar parametros
                // desde la url o rutas por medio del metodo (params) son
                // Aplicables a cuanquier metodo http
app.post('/user/:id', (req, res) => {
  //recivimos la pecicion de navegador del body
  console.log(req.body);
  console.log(req.params);
  //metodo de respuesta send
  res.send('<h1> POST REQUEST RECEIVED </h1>');
});


//RUTA FORM CONTACT
//METODO PUT-> El nevegador envia datos para actualizar el server
app.put('/contact', (req, res) => {
  //metodo de respuesta send
  res.send('<h1> PUT REQUEST RECEIVED </h1>');
});


//RUTA TEST
//METODO DELETE -> El navegador elimina datos del server
app.delete('/test', (req, res) => {
  //metodo de respuesta send
  res.send('<h1> DELETE REQUEST RECEIVED </h1>');
});

//ELIMINO EL DATO QUE LLEGA POR MEDIO DE LA URL
app.delete('/user/:userid', (req, res) => {
  //metodo de respuesta send
  res.send(`Usuario ${req.params.userid} eliminado`);
  console.log('Usuario ' + req.params.userid + ' Eliminado');
});


/*************************
****ARCHIVOS ESTATICOS****
**************************/
//LLAMAMOS LA FUNCION MIDDLEWARES PARA ARCHIVOS ESTATICOS  YA INCLUIDA express
//este metodo nos permite enviar los archivos html, css, js al navegador para el cliente
app.use(express.static('public')); // le pasamos como parametro la carpeta public



//PUERTO DE ESCUCHA
app.listen(app.get('port'), () =>{
  console.log(app.get('appName'))//llamamos la configuracion como si fuese una variable
  console.log('Server on port ', app.get('port') );
});
