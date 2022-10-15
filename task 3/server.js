
const path=require('path')
const express =require('express')
const hbs=require('hbs')
require('dotenv').config()

const app=express()
const PORT =process.env.PORT || 3000;

const staticFiles =path.join(__dirname,'frontend/public')
const viewsFiles=path.join(__dirname,'frontend/views')
const layoutsFiles=path.join(__dirname,'frontend/layouts')

app.set('view engine','hbs')

app.set("views",viewsFiles)
hbs.registerPartials(layoutsFiles)


app.get('/',(req,res)=>{
    res.render('home',{
        pageTitle:'Home Page'
    })
})

app.get('/add',(req,res)=>{
    res.render('add',{
        pageTitle:'Add Page',
        title:'add'
    })
})

app.get('/edit',(req,res)=>{
    res.render('edit',{
        pageTitle:'Edit Page'
    })
})

app.get('/single',(req,res)=>{
    res.render('single',{
        pageTitle:'Single Page'
    })
})

app.get('/delete',(req,res)=>{
    res.render('delete',{
        pageTitle:'Delete Page'
    })
})

app.listen(PORT,()=>{
    console.log(`SERVER RUN ${PORT}`)
})