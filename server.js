var express = require("express");
var jobModel = require("./models/Job");
var jobsData = require("./job-data.js");


var app = express();

app.set("view engine", "jade");
app.set("views", __dirname);

app.use(express.static(__dirname + "/public"));


app.get("/api/jobs", function(req, res) {
   jobsData.findJobs().then(function(collection) {
      res.send(collection);
   })
})

app.get("*", function(req,res) {
   res.render("index");
});




//mongoose.connect("mongodb://localhost/jobfinder");
jobsData.connectDB("mongodb://superuser:superuser@ds031531.mongolab.com:31531/jobfinder")
.then( function() {
   console.log("connected to mongodb successfully"); 
   jobsData.seedJobs();
});


app.listen(process.env.PORT, process.env.IP);