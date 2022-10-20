const express=require('express')
require('dotenv').config()
const path=require('path')


const app=express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const userRoutes=require('./routes/user.routes')
const postRoutes=require('./routes/user.routes')

app.use(userRoutes)
app.use(postRoutes)

module.exports = app;
