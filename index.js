var express = require("express");

// configure the port
var port = 8000

var app = express();
app.use(express.static("assets"));

// set up our templating engine
app.set("view_engine", "ejs");
app.set("views", "templates");

app.listen(port);
console.log("Server running on http://localhost:" + port); //this will display xxxx

app.get("/", function(request, response) {

    response.render("index.ejs", {
        "events": events,
        "flag": flag
    });

});

app.get("/coffee", function(request, response) {

    response.render("coffee.ejs");

});

app.get("/profile", function(request, response) {

    response.render("profile.ejs");

});

app.get("/gym", function(request, response) {

    response.render("gym.ejs");

});

app.get("/events", function(request, response){
    response.render("events.ejs",{
        "date":date,
        "events":events,
        "flag":flag 
    });
});

app.get("/contact", function(request, response){
    response.render("contact.ejs");
});


var flag = false;
const events = [{
        title: "Google Techtalk",
        date: "May 2nd 2021",
        time: "9AM",
        type: "Live event",
        url: "https://www.youtube.com/embed/9Auq9mYxFEE"
    },
    {
        title: "Networking Beer Party",
        date: "May 2nd 2021",
        time: "11PM",
        type: "Live event",
        url: "https://player.twitch.tv/?channel=timthetatman&parent=localhost&&autoplay=false&&branding=false"
    },
    {
        title: "Accenture Recruitment Talk",
        date: "May 4th 2021",
        time: "9AM",
        type: "Live event",
        url: "#"
    },
    {
        title: "Accenture LinkedIn Workshop",
        date: "May 4th 2021",
        time: "12PM",
        type: "Live event",
        url: "#"
    },
    {
        title: "Microsoft UX Talk",
        date: "May 8th 2021",
        time: "9AM",
        type: "Live event",
        url: "https://www.youtube.com/embed/ccjvRloreXg"  
    },
    {
        title: "Free Gym day",
        date: "May 9th 2021",
        time: "All Day",
        type: "In-House Event",
        url: "#"
    }
];

const date = {
    day:"Today",
    date:"May 2nd 2021"
};
