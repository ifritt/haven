'use strict'

let http=require('http');
let path=require('path');
let cookieParser=require('cookie-parser');
let express=require('express');

/*routes*/
let index=require('./routes/index');
let art=require('./routes/art');
let games=require('./routes/games');

/*express*/
let app=express();
/*create server*/
let server=http.createServer(app);
/*view engine setup*/
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var port=8080;
app.set('port',port);
/*listen to port*/
server.listen(port,()=>console.log('server running.'));

/*socket io*/
// let socketio=require('socket.io');
// let io=socketio(server);

// /*events*/
app.use(express.static(__dirname))

app.use('/', index);
app.use('/art', art);
app.use('/games', games);

module.exports=app;