//distributed but centrally accessed
const express = require('express');
const app = express()

const port = 8000;

app.listen(port,function(err){  
    if(err){
        // console.log("Error", err)
        //interpolation
        console.log(`Error in runnign the server: ${err}`);
    }
console.log(    `Server is running at port: ${port}`)
})