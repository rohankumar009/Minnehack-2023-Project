const { serializeInteger } = require("whatwg-url");

var express = require("express"),
    app = express(),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://admin-elsdon:123@cluster0.r5htdck.mongodb.net/eventsDB?appName=mongosh+1.6.1');

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    eventType: String,
    address: String,
})
var Event = mongoose.model("Event", eventSchema);

app.get("/", function(req,res){
    Event.find({}, function(err, events){
        res.render("home", {events: events});
    })
    
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})

// Making a post
app.get('/post', function (req, res) {
    res.render("post")
})

app.post('/submit', function(req, res) {
    var event = new Event({
        name: req.body.Name,
        description: req.body.Description,
        eventType: req.body.Type,
        address: req.body.Address,
    });
    event.save().then(() => {
        res.redirect("/");
    })
    .catch(err => {
        res.status(400).send("Couldn't upload event")
    });
})


