require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT
const errorHandler = require("./middlewares/errorHandler")
const dbatlas ='mongodb+srv://ayusudi:ayusudi@cluster0-acddn.mongodb.net/manga-things?retryWrites=true&w=majority'

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended : false}))

mongoose.connect(dbatlas, {
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

app.use(errorHandler)
app.listen(PORT, function(){
  console.log(`Hello from port ${PORT}`);
})