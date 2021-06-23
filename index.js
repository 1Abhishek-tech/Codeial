//distributed but centrally accessed
const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const port = 8000;

const app = express()
const db = require('./config/mongoose')
//for older verson less than 4.16.0 you have to mention body parser
// const bodyParser  = require('body-parser');
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser())
// app.use(bodyParser()); 

app.use(express.static('asserts'))
//use express router
app.use('/', require('./routes'))

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up view engine
app.set('view engine', 'ejs')
app.set('views','./views')

app.listen(port,function(err){  
    if(err){
        // console.log("Error", err)
        //interpolation
        console.log(`Error in runnign the server: ${err}`);
    }
console.log(    `Server is running at port: ${port}`)
})