//distributed but centrally accessed
const express = require('express');
const cookieParser = require('cookie-parser')
const app = express()
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')


//used for session cookie and authentication password
const session = require('express-session')
const passport= require('passport')
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')

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

app.use(express.static('asserts'))


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
  secret: 'something',
  saveUninitialized: false,
  resave: false,
  cookie:{
    maxAge:(1000*60*100)
  },
  store: MongoStore.create({
    mongoUrl : 'mongodb://localhost/codeial_development',
    mongooseConnection: db,
    autoRemove: 'disabled'
  },function(err){
    console.log(err || 'connect mongo-db setup OK')
  })
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser)
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