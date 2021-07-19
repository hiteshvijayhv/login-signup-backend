const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require("cors");
app.use(express.json())
app.use(cors())
//Import routes
const authRoute = require('./routes/auth')
const loggedin = require('./routes/LoggedIn')

const MONGO_URI = 'mongodb+srv://ticks11:hYW7MywKfo8PuxUH@cluster0.sm7a6.mongodb.net/loginsignup?retryWrites=true&w=majority'

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => console.log('Connected to the Database'))

app.use(express.json())

//Route middleware
app.use('/api/user', authRoute)
app.use('/api/loggedin', loggedin)

app.get('/', (req, res) => {
    res.send('server working')
})

app.listen(8000, () => console.log('Running on port 3000'))