const app=require('./app/src')
const PORT=process.env.PORT ||3000
app.listen(PORT, function(){
    console.log(`Server running on ${PORT}`);
})