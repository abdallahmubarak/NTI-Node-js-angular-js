const deal = require("./dealWithJson")
const fileName = "todo.json"
const add = (data) =>{
    
    const myTodo = deal.readFromJson(fileName)
    const isFound =myTodo.findIndex(t=>
        t.title==data.title
        )
    if (isFound!=-1)return console.log('items used before');
    myTodo.push(data)
    deal.writeToJson(myTodo,fileName)
    console.log('data added')

}


const showAll = () =>{
    const myTodo = deal.readFromJson(fileName)
if(myTodo.length==0) return console.log('no data')
myTodo.forEach(t=>console.log(`id=>${t.id}
title =>${t.title}
content =>${t.content}
`))
}

const showSingle = (id) =>{
    const myTodo =deal.readFromJson(fileName)
    const res =myTodo.find(t=>t.id==id)
    if(!res) console.log('id not found')
    console.log(`id=>${res.id}
    title =>${res.title}
    content =>${res.content}`)
}

const edit = (id,newTitle,newContent) =>{
    const myTodo =deal.readFromJson(fileName)
    const isFound=myTodo.findIndex(t=>t.id==id)
    if(!isFound==-1) return('item not found')
    myTodo[isFound].title=newTitle;
    myTodo[isFound].content=newContent;
    deal.writeToJson(myTodo)


}

const del = (id) =>{
    const myTodo =deal.readFromJson(fileName)
    const isFound =myTodo.findIndex(t=>t.id==id)
    if(isFound==-1) console.log('items not found')
    myTodo.splice(isFound,1)
    deal.writeToJson(myTodo)
    console.log("deleted")

}
const addComment =(id,comment)=>{
    const data=deal.readFromJson(fileName)
    const elementIndex =data.findIndex((el)=>el.id==id);
    data[elementIndex].comments.push(comment)
    console.log(data[elementIndex])
    deal.writeToJson(fileName)
   
}

module.exports = {
    add, showAll, showSingle, edit, del,addComment
}