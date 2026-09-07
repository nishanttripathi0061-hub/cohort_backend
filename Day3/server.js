const express = require("express");

const app = express();
app.use(express.json());
const notes =[]

app.post('/notes',(req , res)=>{
  notes.push(req.body);
  
  res.send('Notes Created' )
  
})
app.get('/notes' , (req , res)=>{
  
  res.send(notes);

})


app.listen(3000, () => {
  console.log("server is started at port 3000");
});
