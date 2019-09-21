const express = require('express');
const socketIO = require('socket.io');
const http = require('http')

const path = require('path');

const app = express();
// instanciamos http
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend a travez del socket
let io = socketIO(server)

io.on('connection', (client) =>{
    console.log("Usuario conectado");

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje:'Bienvenido a nuestros servicios'
    })
  
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
        
    });

    // escuchar el clinete
    client.on('enviarMensaje', (mensaje) =>{
        console.log(mensaje);
        
    })
    
})

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});