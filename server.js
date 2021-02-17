const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const path = require('path')


const app = express()
const port = process.env.PORT || 5000
//Listen on provided port
app.listen(port, () => {
    console.log('Great');
    console.log(`Server on ${port}`);
})


//Middleware
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));


//Route middleware
const ProductRoute = require('./routes/productsRoute')
app.use('/', ProductRoute)

//Connecting to mongodb
require('dotenv').config()
const URI = process.env.MONGO
mongoose.connect(
    URI,
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true}
)
const connection = mongoose.connection
connection.once('open', () => {
    console.log('Connection established successfully');
})


app.get('/', (req, res) => {
    res.send("<h1>It's home page</h1>")
}) 
