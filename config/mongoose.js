const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/codeial_development',{useNewUrlParser: true, useUnifiedTopology: true})
// mongoose.set('useUnifiedTopology', true);
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting to MongoDB"))

db.once('open',function(){
    console.log("Connected to Database :: MongoDB")
})

