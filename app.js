const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");


var app = express();

app.use(bodyparser.urlencoded({extended:true}));


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    const cityName = req.body.cname;
    const query = cityName;
    const apiID = "d1e30a3015c154ef301f876693ce5d24";
    const unit = "metric"
    var url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiID+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);

        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const weatherURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            const weatherImage = "<img src="+weatherURL+">";
            res.write("<p>Hi friend</p>");
            res.write("<h1>The temprature in "+ query + " is "+ temp +" and weather is "+weatherDiscription + weatherImage+"</h1>")
            res.send()
            console.log(weatherData);
        });

    });

});

app.listen(3000,function(req,res){
    console.log("server started at port 3000");
});