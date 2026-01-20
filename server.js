const express=require('express');
const mysql=require('mysql');
const bodyparser=require('body-parser');
const path=require('path');
const cors=require('cors');
require('dotenv').config();
const connection = require('./router/db');

const signinrouter=require('./router/signinrouter.js');
const quizrouter=require('./router/quizrouter.js');
const scorerouter=require('./router/scorerouter.js');
const showquizrouter=require('./router/showquiz.js');
const imagerouter=require('./router/imagerouter.js');
require('dotenv').config();
const app=express();
const port=process.env.PORT;
app.use(cors());
app.use(bodyparser.json());
app.use(express.static('public')); 
app.use(express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/',signinrouter);
app.use('/quiz',quizrouter);
app.use('/score',scorerouter);
app.use('/userquiz',showquizrouter);
app.use('/image',imagerouter);

app.get('/adminquiz_control.html',(req,res)=>{
    try{
    res.sendFile(path.join(__dirname,'views','adminquiz_control.html'));
    console.log('control file taken');
    }catch(error){
        console.error(error);
    }
});


app.get('/codepage.html',(req,res)=>{
    try{
    res.sendFile(path.join(__dirname,'..','views','code.html'));
    console.log('code file taken');
    }catch(error){
        console.error(error);
    }
});




app.get('/score.html',(req,res)=>{
    try{
    res.sendFile(path.join(__dirname,'views','score.html'));
    console.log('score file taken');
    }catch(error){
        console.error(error);
    }
});

app.get('/attend_quiz.html',(req,res)=>{
    try{
    res.sendFile(path.join(__dirname,'views','quiz.html'));
    console.log("quiz file taken");
    }catch(error){
        console.error(error);
    }
});



process.on('SIGINT', () => {
    console.log('Shutting down the server');
    connection.end(err => {
        if (err) {
            console.error('Error closing the database connection', err);
        } else {
            console.log('Database connection closed');
        }
        process.exit(); 
    });
});

app.listen(port,'0.0.0.0',()=>{
    console.log('server is connected'); 
})

