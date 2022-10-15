const todo = require("./controller/todo")
switch(process.argv[2]){
    case 'add':
        const myData ={id:Date.now(),
            title:process.argv[3],
            content:process.argv[4],
            comments:[]
        }
        todo.add(myData)
        break;
    case 'showAll':
            todo.showAll()
            break;
    case 'single':
                todo.showSingle(process.argv[3])
                break;
    case 'del':
                todo.del(process.argv[3])
                break;
    case 'edit':
                todo.edit(process.argv[3],
                    process.argv[4],
                    process.argv[5])
        break;
        case 'addComment':
            todo.addComment(process.argv[3],
                process.argv[4],
                process.argv[5])
    break;

        default:
                    console.log('invalid operaion')
    
}