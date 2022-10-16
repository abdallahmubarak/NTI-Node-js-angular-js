const MonogoClient = require("mongodb").MongoClient
const myConnection = (cb)=>{
    MonogoClient.connect(process.env.DBURL, (err, client)=>{
        if(err) return cb(err, null)
        const db = client.db(process.env.DBNAME)
        cb(null, db)
    })
}
module.exports = myConnection