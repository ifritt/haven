var express = require('express');
var mysql = require('mysql');
var router = express.Router();

// var connection = mysql.createConnection({
//     insecureAuth: true,
//     host: 'localhost',
//     user: 'root',
//     password: ''
// });
// connection.connect(function (err) {
//     if (err) throw err;
//     connection.query('CREATE DATABASE IF NOT EXISTS entrydb;', function (err) {
//         if (err) throw err;
//         connection.query('USE entrydb', function (err) {
//             if (err) throw err;
//         })
//     });
//     connection.query('CREATE TABLE IF NOT EXISTS posts(id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY(id), postTitle VARCHAR(255), postDate VARCHAR(255), postContent VARCHAR(255));', function (err) {
//         connection.query('INSERT INTO posts(postTitle, postDate, postContent) VALUES("exxampleMysqlPost", "18 June 2018", "This is just text to fill up the content space of this post. Make it long make it long make it long.")');
//     })
// });



/*GET homepage*/
router.get('/', function (req, res, next) {
    // nav.render(req, res);
    res.render('index', { title: 'HOME' });
});


module.exports = router;