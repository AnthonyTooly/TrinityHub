var express = require("express");

// configure the port
var port = 8000

var app = express();
app.use(express.static("assets"));

// set up our templating engine
app.set("view_engine", "ejs");
app.set("views", "templates");

app.listen(port);
console.log("Server running on http://localhost:" + port);

app.get("/", function (request, response) {

    response.render("index.ejs",{
        "events":events
    });

});

app.get("/coffee", function (request, response) {

    response.render("coffee.ejs");

});



const events=[
    {
        title:"Google Techtalk",
        date:"May 2nd 2021 @9AM",
        type:"Live event"
    },
    {
        title:"Networking Beer Party",
        date:"May 2nd 2021 @11PM",
        type:"Live event"
    },
    {
        title:"Accenture Recruitment Talk",
        date:"May 4th 2021 @9AM",
        type:"Live event"
    },
    {
        title:"Accenture LinkedIn Workshop",
        date:"May 4th 2021 @12PM",
        type:"Live event"
    },
    {
        title:"Microsoft UX Talk",
        date:"May 8th 2021 @9AM",
        type:"Live event"
    },
    {
        title:"Microsoft UX Talk",
        date:"May 9th 2021 @All Day",
        type:"In-House Event"
    }
];