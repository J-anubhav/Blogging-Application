const path = require('path')
const express = require('express');
const mongoose = require('mongoose')

const userRoute = require('./routes/user') 

mongoose.connect('mongodb://localhost:27017/blue').then(e=>{console.log("MongoDB is connected ")})
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.urlencoded({extended: false}))

app.get('/', (req,res)=>{    
    res.render('home')
})

app.use("/user", userRoute)
app.listen(PORT, ()=> {
    console.log(`Your serveris running at ${PORT}`)
})
 