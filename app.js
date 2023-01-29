var express = require("express"),
    app = express(),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    LocalStrat = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose")

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect('mongodb://127.0.0.1:27017/eventsDB');
const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    eventType: String,
    address: {
        street: String,
        city: String,
        zip: Int8Array
    }

})
var Event = mongoose.model("Event", eventSchema);

app.get("/", function(req,res){
    res.render("home");
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
})

// Making a post
app.get('/post', function (req, res) {
    res.render("eventDetails")
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
    event.save().then(item => {
        res.send("Event sucessfully Posted!");
    })
    .catch(err => {
        res.status(400).send("Couldn't upload event")
    });
    res.redirect("/")
})


