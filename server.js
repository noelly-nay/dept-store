if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const Router = require("./routes")

app.use(express.json());

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

try {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
      }, () =>
      console.log("connected"));
  } catch (error) {
    console.log("could not connect");
  }

 
app.use('/', indexRouter)
app.use('/authors', authorRouter)


app.listen(process.env.PORT)