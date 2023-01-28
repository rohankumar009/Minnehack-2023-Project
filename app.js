const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const mongoose = require("mongoose");


app.get("/", function(req,res){
    res.render("home");
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})