const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 3000
require('dotenv').config()
//const util = require('util')
//const mysql = require('mysql')
// const db = require('api/db')

var path = require("path");
app.use(express.static("public"));

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "public"))); // serve static resource

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');
// index page 
app.get('/', function(req, res) {
    
    // var data;
    // let sql = 'SELECT * FROM heads ORDER BY id DESC '
        // db.query(sql, (err, response) => {
            // if (err) throw err
            // data = response
     //       res.json(response)
        // })
        
     // res.render('pages/index', { 
      // data: data
    // });    
        
    res.render('pages/index');
});


let routes = require('./api/routes') //importing route
routes(app)

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
})

var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(443, () => {
  console.log('listening on *:443');
});
//app.listen(port, () => console.log('App listening at http://localhost:${port}'))

