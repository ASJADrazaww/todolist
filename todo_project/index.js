const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();


mongoose.connect("mongodb+srv://qudseefatima:qze2cdwXihy4N39G@cluster0.ru64a74.mongodb.net/todolist?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const Task = require("./models/Task");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.render("index", { tasks });
});

app.post("/add", async (req, res) => {
  const { title, priority } = req.body;
  if (!title.trim()) {
    return res.send(`<script>alert('Task title cannot be empty!'); window.location.href='/'</script>`);
  }
  const newTask = new Task({ title, priority });
  await newTask.save();
  res.redirect("/");
});

app.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { newTitle, newPriority } = req.body;
  await Task.findByIdAndUpdate(id, { title: newTitle, priority: newPriority });
  res.send(`<script>alert('Task updated successfully!'); window.location.href='/'</script>`);
});

app.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  res.send(`<script>alert('Task deleted successfully!'); window.location.href='/'</script>`);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
