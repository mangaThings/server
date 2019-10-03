require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes')
const morgan = require('morgan')
const app = express()
const PORT = 3000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

mongoose.connect('mongodb://localhost:27017/manga-things', {
    useNewUrlParser : true , useUnifiedTopology: true 
}, function(err){
    if(err) {
        console.log(err)
        console.log(`server isn't connect to mongodb`);
    }
    else {
        console.log('Connected!');
    }
})

app.use('/', index)

app.listen(PORT, function(){
  console.log(`Hello from port PORT`);
})