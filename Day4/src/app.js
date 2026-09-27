const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await noteModel.create({
    title: title,
    description: description,
  });
  res.status(201).json({
    message: " Note created successfully",
    note,
  });
});

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();
  res.status(200).json({
    message : "notes fetched successfully",
    notes
  })
});

// app.delete("/notes/:id", (req, res) => {
//   const id = Number(req.params.id);
//   // delete notes[id];
//   res.send("deleted");

//   notes.splice(id, 1);
// });

// app.patch("/notes/:id" , (req , res)=>{
//   const id = Number(req.params.id);
//   notes[id].description = req.body.description;
//   res.send("updated")
// })

// app.put("/notes/:id" , (req , res)=>{
//   const id = Number(req.params.id);
//   notes[id].name = req.body.name;
//   notes[id].about = req.body.about;

// })

module.exports = app;
