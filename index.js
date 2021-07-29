//distributed but centrally accessedFA
const express = require('express');
const env = require('./config/environment')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const app = express()
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')

app.use((req,res,next)=>{
  res.setHeader('Acces-Control-Allow-Origin','*');
  res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
  next(); 
})

//used for session cookie and authentication password
const session = require('express-session')
const passport= require('passport')
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy')
const passportGoolgle = require('./config/passport-google-oauth2-stratrgy')
const MongoStore = require('connect-mongo')
const sassMiddleware = require('node-sass-middleware')
const flash = require('connect-flash')
const customMware = require('./config/middleware');
const { config } = require('process');

// Seting up chat server using socket.io
const chatServer = require('http').Server(app)
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer)
chatServer.listen(5000)
console.log('Chat server : 5000')
const path = require('path')

if(env.name == 'development'){
  app.use(sassMiddleware({
    // src : path.join( __dirname,env.asset_path,'scss') ,     //'./asserts/scss'
    src : './asserts/scss' ,     //'./asserts/scss'
    // dest:  path.join( __dirname,env.asset_path,'css')    ,   //'./asserts/css'
    dest:  './asserts/css'   ,   //'./asserts/css'
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
  }))
}

//for older verson less than 4.16.0 you have to mention body parser
// const bodyParser  = require('body-parser');
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());

app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser())
app.use(express.json());

// app.use(bodyParser()); 

// app.use(express.static('./asserts'))     //env.asset_path
app.use(express.static('.'+  env.asset_path))     //env.asset_path
//make the upload path available to the browser
app.use('/uploads',express.static(__dirname + '/uploads'))

app.use(logger(env.morgan.mode , env.morgan.options))

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//set up view engine
app.set('view engine', 'ejs')
app.set('views','./views')

//mongostore is used to store the session cookie in the db
app.use(session({
  name: 'Codeial',
  //TODO change the secret before deployment in the production mode
  secret: env.session_cookie_key,
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge:(1000*60*100)
  },
  store: MongoStore.create({
    mongoUrl : `mongodb://localhost/${env.db}`,
    mongooseConnection: db,
    autoRemove: 'disabled'
  },function(err){
    console.log(err || 'connect mongo-db setup OK')
  })
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)

app.use(flash())
app.use(customMware.setFlash)
//use express router
app.use('/', require('./routes'))

app.listen(port,function(err){  
    if(err){
        // console.log("Error", err)
        //interpolation
        console.log(`Error in runnign the server: ${err}`);
    }
console.log(    `Server is running at port: ${port}`)
})