//use path module
const path = require('path');
//use express module
const express = require('express');

//use hbs view engine
const hbs = require('hbs');

var http = require('http').Server(app);

var io = require('socket.io')(http);

var mongoose = require('mongoose');

var app = express();

//use bodyParser middleware
const bodyParser = require('body-parser');

// const app = express();

const hostname = '127.0.0.1';
const port = 3000;

//set dynamic views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
//set public folder as static folder for static file
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var Messages = mongoose.model('messages',{ name : String, message : String});

//route for home page
app.get('/',(req, res) => {
  //render index.hbs file
  res.render('index',{
    name : "Dung"
  });
});

//route for showing form
app.get('/post',(req, res) => {
  //render form.hbs file
  res.render('form');
});

//route for submit form by using post method
app.post('/post',(req, res) => {
  //render file form.hbs
  res.render('index',{
    //get value from textname
    name : req.body.textname
  });
});

//route for home with params name
app.get('/:name',(req, res) => {
  //render index.hbs file
  res.render('index',{
    name : req.params.name
  });
});

app.get('/home', function (req, res) {
  res.send('Welcome to Express');
});

app.get('/about', function (req, res) {
  res.send('This is about page');
});

// app chat
app.get('/messages', (req, res) => {
    messages.find({}, (err, messages) => {
        res.send(messages); // trước mắt cứ show trước dạng json đã nhé
    });
});

app.post('/messages', (req, res) => {
    var  message = new Messages(req.body);  // khởi tạo 1 đối tượng Messages 
    // Tiến hành lưu dữ liệu vào mongo
    message.save((err) => {
        if(err) res.sendStatus(500);
        res.sendStatus(200);
    });
});


io.on('connection', () =>{ 
    console.log('connecting');
});
// end app chat

// app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

var server = http.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});

mongoose.connect('mongodb://localhost:27017/app_chat',{ useNewUrlParser: true }, (err) => {
    console.log("Kết nối thành công", err);
});