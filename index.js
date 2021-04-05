var express = require("express");
var mysql = require('mysql');
var bodyParser = require("body-parser");
//Configure mysql connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "Group4_Assignment3",
    port: 3306
});

//Test connection
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});

// configure the port
var port = 8000

var app = express();
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended: true}));



// set up our templating engine
app.set("view_engine", "ejs");
app.set("views", "templates");

app.listen(port);
console.log("Server running on http://localhost:" + port); //this will display xxx


app.get("/", function (request, response) {

    response.render("index.ejs", {
        "events": events,
        "flag": flag
    });

});

app.get("/coffee", function (request, response) {

    response.render("coffee.ejs");

});

app.get("/profile", function (request, response) {

    response.render("profile.ejs");

});

app.get("/gym", function (request, response) {

    response.render("gym.ejs");

});

app.get("/events", function (request, response) {
    response.render("events.ejs", {
        "date": date,
        "events": events,
        "flag": flag
    });
});

app.get("/contact", function (request, response) {
    response.render("contact.ejs");
});

app.post("/signup", function (request, response) {

    //Retrieve data from signup form
    var username = request.body.username;
    var email = request.body.email;
    var password = request.body.password;

    //Check whether the user already exists
    checkSignup(username, function (result) {
        if (result == false) {
            con.query("INSERT INTO users (username, password, email) VALUES ('" + username + "','" + password + "','" + email + "')", function (err, result, fields) {
                if (err)
                    throw err;
            });
            response.render("index.ejs", {
                "events": events,
                "flag": flag
            });
        } else {
            //Show error message
            
        }
    });

});

app.post("/login", function (request, response) {

    //Retrieve data from signup form
    var username = request.body.username;
    var password = request.body.password;
  
    //Check whether the user already exists
    checkLogin(username, password, function (result) {
        if (result == false) {
            //Create session data
 
            response.render("profile.ejs", {
                "username": username
            });
        } else {
            //Show error message

        }
    });

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
    day: "Today",
    date: "May 2nd 2021"
};


//This function will check to ensure of a valid signup
function checkSignup(user, callback) {

    //Get data from users table
    con.query("SELECT * FROM users where username = '" + user + "';", function (err, result, fields) {
        if (err)
            throw err;
        //If a match is found, return true
        if (result[0] != null) {
            return callback(true);
        } else {
            if (user.length > 0) {
                return callback(false);
            } else {
                return callback(true);
            }
        }
    });
}

function checkLogin(user, pass, callback) {
    //Get data from users table
    con.query("SELECT * FROM users where username = '" + user + "';", function (err, result, fields) {
        if (err)
            throw err;
        //If a match is found, return true
        if (result[0] == null) {
            return callback(true);
        } else {
          
            if (result[0].username == user && result[0].password == pass) {     //User found
                return callback(false);
            } else {
                return callback(true);
            }
        }
    });
}
