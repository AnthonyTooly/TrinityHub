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

app.get("/gym", function(request, response) {

    response.render("gym.ejs");

});




var flag = false;
const events = [{
        title: "Google Techtalk",
        date: "May 2nd 2021 @9AM",
        type: "Live event",
        url: "https://talksat.withgoogle.com/"
    },
    {
        title: "Networking Beer Party",
        date: "May 2nd 2021 @11PM",
        type: "Live event",
        url: "https://www.eventbars.ie/party-home-bars-beer-kegs-hire-ireland/"
    },
    {
        title: "Accenture Recruitment Talk",
        date: "May 4th 2021 @9AM",
        type: "Live event",
        url: "https://youtu.be/2q0da_2wonA"
    },
    {
        title: "Accenture LinkedIn Workshop",
        date: "May 4th 2021 @12PM",
        type: "Live event",
        url: "https://www.linkedin.com/company/accenture/?originalSubdomain=ie"
    },
    {
        title: "Microsoft UX Talk",
        date: "May 8th 2021 @9AM",
        type: "Live event",
        url: "https://ux.microsoft.com/Talk/EdgeBrowserServices"
    },
    {
        title: "Free Gym day",
        date: "May 9th 2021 @All Day",
        type: "In-House Event",
        url: "#"
    }
];