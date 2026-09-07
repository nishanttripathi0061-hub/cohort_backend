const express = require('express');

const app = express(); // server created

app.get('/',(req , res)=>{
    res.send('Hello World') // yha se ham req ya res krte hai..
})

app.get('/about',(req,res)=>{
    res.send('This is about page')
})


app.listen(3000 ,()=>{
    console.log("Server started at port 3000") // server start
})