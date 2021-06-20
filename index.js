//distributed but centrally accessed
const express = require('express');
const app = express()

const port = 8000;

//use express router
app.use('/', require('./routes'))

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