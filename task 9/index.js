const app = require("./app/src")
const PORT = process.env.PORT
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`))