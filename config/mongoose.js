const mongoose = require('mongoose')
const env = require('./environment')
mongoose.connect(`mongodb://localhost/${env.db
}`,{useNewUrlParser: true, useUnifiedTopology: true})
// mongoose.set('useUnifiedTopology', true);
const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error Connecting to MongoDB"))

db.once('open',function(){
    console.log("Connected to Database :: MongoDB")
})

