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

    response.render("index.ejs");

});