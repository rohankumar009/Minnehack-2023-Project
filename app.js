const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/eventsDB');
const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
})
const Event = mongoose.model("Event", eventSchema);

app.get("/", function(req,res){
    res.render("home");
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})