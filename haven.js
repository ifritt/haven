'use strict'

const http = require('http');
const path = require('path');
// let cookieParser=require('cookie-parser');
let express = require('express');
let bodyparser = require('body-parser');

/*routes*/
let index = require('./route/index');
let art = require('./route/art');

/*express*/
let app = express();
const server = http.createServer(app);

/*view engine setup HTML*/
app.set('views', path.join(__dirname, 'html'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

const port = process.env.PORT || 8080;
app.set('port', port);

/*listen to port*/
// server.listen(port,()=>console.log('server running.'));
server.listen(port, function () { console.log('running on port: ' + port) });

/* use */
app.use(express.static(__dirname));

// /*events*/

app.use('/', index);
app.use('/art', art);

module.exports = app;