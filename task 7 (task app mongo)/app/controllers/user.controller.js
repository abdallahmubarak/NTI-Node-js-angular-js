const myConnection = require('../db/connect')
const connect = require('../db/connect')
const ObjectId= require("mongodb").ObjectId
class User{
    //add
    static add = (req, res)=>{
        res.render("add",{
            pageTitle:"add New User"
        })
    }
//post add
    static addLogic = (req, res)=>{
        connect(async(err, db)=>{
         if(err) res.render("err404", {pageTitle:"database error 1"})
          try{
            req.body.status? req.body.status=true: req.body.status=false
            await db.collection("tasks").insertOne(req.body)
            res.redirect("/")
          }
          catch(e){
            res.render("err404", {pageTitle:"database error 2"})
          }
             
        })
    }
    
    static index = (req, res)=>{
        connect(async(err, db)=>{
            if(err) res.render("err404", {pageTitle:"database error 1"})
             try{
                const data = await db.collection("tasks").find().toArray()
                res.render("home", {
                    pageTitle:"All Tasks",
                    data,
                    isEmpty : !data.length
                })
             }
             catch(e){
                res.send(e.message)
             }
            })
    }
    static single = (req, res)=>{
        res.render("single")
    }
    static edit = (req, res)=>{
        connect(async(err,db)=>{
            if(err) res.render('err404',{pageTitle:'database error 1'})
             try {
                await db.collection('tasks').findOne({_id:new ObjectId(req.params.id)})
                .then(result=>{
                    res.render('editStatus',{
                        pageTitle:'Edit User',
                        data:result
                    })
                })
             } catch (error) {
                res.send(e.message)
             }   
        })
    }
    static editLogic = (req, res)=>{
        connect(async(err, db)=>{
            if(err) res.render("err404", {pageTitle:"database error 1"})
             try{
               await db.collection('tasks').updateOne(
                {_id:new ObjectId(req.params.id)},
                {$set:req.body.status}
                
            ).then(result=>{
                res.redirect("/")
            }
            )
                }
                   catch(e){
               res.render("err404", {pageTitle:"database error 2"})
             }
                
           })
        
    }
    
    static delUser = (req, res)=>{
        connect(async(err, db)=>{
            if(err) res.render("err404", {pageTitle:"database error 1"})
             try{
                await db.collection("tasks").deleteOne({_id: new ObjectId(req.params.id)})
                res.redirect("/")
             }
             catch(e){
                res.send(e.message)
             }
            })
    }
}
module.exports = User