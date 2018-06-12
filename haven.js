'use strict'

let http=require('http');
let path=require('path');
// let cookieParser=require('cookie-parser');
let express=require('express');

/*routes*/
let index=require('./route/index');
let art=require('./route/art');
let games=require('./route/games');

/*express*/
let app=express();
/*create server*/
let server=http.createServer(app);
/*view engine setup*/
app.set('views', path.join(__dirname, 'html'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

var port = process.env.PORT || 8080;
app.set('port',port);
/*listen to port*/
// server.listen(port,()=>console.log('server running.'));
server.listen(port,function(){console.log('haven running.')});

/*socket io*/
// let socketio=require('socket.io');
// let io=socketio(server);

// /*events*/
app.use(express.static(__dirname))

app.use('/', index);
app.use('/art', art);
app.use('/games', games);

module.exports=app;