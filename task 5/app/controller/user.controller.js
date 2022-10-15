const deal = require("../controller/deal")
const dbFile = "app/db/users.json"
//get home page   
const getHome = (req,res)=>{
    const allUsers = deal.readFromJson(dbFile)
    res.render("home", {
        pageTitle:"Home Page",
        allUsers
    })
}
//get add page
const getAdd=(req,res)=>{
    res.render('add',{
        pageTitle:'Add Customar',
    })
    }
//post add page    
const postAddCustomar=(req,res)=>{
    const user = {id:Date.now(), ...req.body}
    let {initBalance,reminedBalance}=req.body;
    const allUsers = deal.readFromJson(dbFile)
    const sum = total(initBalance,reminedBalance);
    allUsers.push(user)
    deal.writeToJson(allUsers, dbFile)
    res.redirect("/");   
}

const getSingle =(req,res)=>{
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

const deleteUser= (req,res)=>{
    let isFound =true
    const userId = req.params.id
    const allUsers=deal.readFromJson(dbFile)
    const userData = allUsers.findIndex(u=> u.id == userId)
    if(userData==-1) isFound=false
    else allUsers.splice(userData, 1)
    deal.writeToJson(allUsers, dbFile)
    res.redirect("/")
}
const getEdit =(req,res)=>{
    res.render('edit',{
        pageTitle:'Edit Page',
        
    })
}

const postEdit =(req,res)=>{
    let isFound =true
    const userId = req.params.id
    const allUsers=deal.readFromJson(dbFile)
    const userData = allUsers.findIndex(u=> u.id == userId)
    if(userData==-1) isFound=false
    else allUsers[userData] = {id:userId, ...req.body}    
    deal.writeToJson(allUsers, dbFile)
    res.redirect("/")
}
function total(initBalance,reminedBalance){
   return (initBalance + reminedBalance);
}

module.exports = {getHome, getAdd,postAddCustomar,deleteUser,getSingle,getEdit,postEdit}