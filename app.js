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
mongoose.connect('mongodb://127.0.0.1:27017/eventsDB');

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    eventType: String,
    address: {
        street: String,
        city: String,
        zip: String,
    }

})
var Event = mongoose.model("Event", eventSchema);

app.get("/", function(req,res){
    res.render("home", {events: Event});
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
        address: {
            street: req.body.Street,
            city: req.body.City,
            zip: req.body.Zip
        }
    });
    event.save().then(() => {
        res.redirect("/");
    })
    .catch(err => {
        res.status(400).send("Couldn't upload event")
    });
})


