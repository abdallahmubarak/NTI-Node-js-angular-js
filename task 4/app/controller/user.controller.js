const deal = require("../controller/deal")
const dbFile = "app/db/users.json"

const showAll = (req,res)=>{
    const allUsers = deal.readFromJson(dbFile)
    res.render("home", {
        pageTitle:"Home Page",
        allUsers
    })
}
const add = (req,res)=>{
    res.render("add", {
        pageTitle:"Add User",
        title:"Add Ahmed"
    })
}
const addMethod =  (req, res)=>{
    const user = {id:Date.now(), ...req.query}
    const allUsers = deal.readFromJson(dbFile)
    allUsers.push(user)
    deal.writeToJson(allUsers, dbFile)
    res.redirect("/")
}
const addPost =(req,res)=>{
    res.render("addPost", {
        pageTitle:"Add User",
        title:"Add Ahmed"
    })
}
const addPostMethod =(req, res)=>{
    const user = {id:Date.now(), ...req.body}
    const allUsers = deal.readFromJson(dbFile)
    allUsers.push(user)
    deal.writeToJson(allUsers, dbFile)
    res.redirect("/")
}
const edit = (req,res)=>{
    let isFound =true
    const userId = req.params.id
    const allUsers=deal.readFromJson(dbFile)
    const userData = allUsers.find(u=> u.id == userId)
    if(!userData) isFound=false
    res.render("edit", {
        pageTitle:"Edit User",
        userData,
        isFound
    })
}
const single =(req,res)=>{
    let isFound =true
    const userId = req.params.id
    const allUsers=deal.readFromJson(dbFile)
    const userData = allUsers.find(u=> u.id == userId)
    if(!userData) isFound=false
    res.render("single", {
        pageTitle:"Single User",
        userData,
        isFound
    })
}
const del =(req,res)=>{
    let isFound =true
    const userId = req.params.id
    const allUsers=deal.readFromJson(dbFile)
    const userData = allUsers.findIndex(u=> u.id == userId)
    if(userData==-1) isFound=false
    else allUsers.splice(userData, 1)
    deal.writeToJson(allUsers, dbFile)
    res.redirect("/")
}
const editLogic= (req,res)=>{
    let isFound =true
    const userId = req.params.id
    const allUsers=deal.readFromJson(dbFile)
    const userData = allUsers.findIndex(u=> u.id == userId)
    if(userData==-1) isFound=false
    else allUsers[userData] = {id:userId, ...req.body}    
    deal.writeToJson(allUsers, dbFile)
    res.redirect("/")
}
module.exports = { 
    showAll,add, addMethod, addPost, addPostMethod, edit, del, single, editLogic
}