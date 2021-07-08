const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const { stringify } = require("querystring");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.get("/caseCountry",function(req,res){
    res.sendFile(__dirname+"/caseCountry.html");
});

app.post("/caseCountry",function(request,response){
    const countryCase=request.body.countryName;
    var options = {
      'method': 'GET',
      'hostname': 'corona.lmao.ninja',
      'path': '/v2/countries/'+countryCase+'?yesterday=true&strict=true&query%20=null',
      'headers': {
      },
      'maxRedirects': 20
    };
    var req = https.request(options, function (res) {
      var chunks = [];
    
      res.on("data", function (chunk) {
        chunks.push(chunk);
      });
    
      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
      //   console.log(JSON.parse(body.toString()));
      //   console.log(body.toString());
          var covidData=JSON.parse(body.toString());
          var casedaily=covidData.todayCases;
          var imageURL=covidData.countryInfo.flag;
          var totalCase=covidData.cases;
          var activeCase=covidData.active;
          var criticalCase=covidData.critical;
          var casePerPeople=covidData.oneCasePerPeople;
          
          response.send("<body style='background-color:#C3447A; color:white;text-align:center;font-family:Arial, sans-serif;font-style:oblique;'><img src="+imageURL+"><br><br><h1>Today Case recorded till now: "+casedaily+"</h1><h2>Total Cases since 2020: "+
          totalCase+"</h2><h2>Total Active Case now: "+activeCase+"</h2><h2>Total Critical case now: "+criticalCase+"</h2><h2>Case Per people in "+countryCase+": "+
          casePerPeople+"</h2></body>");
          
      });
    
      res.on("error", function (error) {
        console.error(error);
        response.sendFile(__dirname+"/failure.html");
      });
    });
    
    req.end();
})

app.get("/caseContinent",function(req,res){
    res.sendFile(__dirname+"/caseContinent.html");
});

app.post("/caseContinent",function(request,response){
  const continentName=request.body.continentName;
  var options={
      'method': 'GET',
      'hostname': 'corona.lmao.ninja',
      'path':'/v2/continents/'+continentName+'?yesterday=true&strict=false',
      'headers':{
      },
      'maxRedirects':20
  };
  var req=https.request(options,function(res){
    var chunks=[];
    res.on("data",function(chunk){
      chunks.push(chunk);
    });
    res.on("end",function(chunk){
      var body=Buffer.concat(chunks);
      var continentCovid=JSON.parse(body.toString());
      var todayCases=continentCovid.todayCases;
      var activeCase=continentCovid.active;
      var criticalCase=continentCovid.critical;
      var casePerOneMillion=continentCovid.casesPerOneMillion;
      var totalCase=continentCovid.cases;
      var imageURL="images/"+continentName+".jpeg";
      response.send("<body style='background-color:#C3447A; color:white;text-align:center;font-family:Arial, sans-serif;font-style:oblique;'><img src="+imageURL+"><br><br><h1>Today Case recorded till now: "+todayCases+"</h1><h2>Total Cases since 2020: "+
          totalCase+"</h2><h2>Total Active Case now: "+activeCase+"</h2><h2>Total Critical case now: "+criticalCase+"</h2><h2>Case Per people in "+continentName+": "+
          casePerOneMillion+"</h2></body>");
    });
    res.on("error", function (error) {
      console.error(error);
    });
  });
  req.end();
})

app.get("/deathCountry",function(req,res){
  res.sendFile(__dirname+"/deathCountry.html");
})

app.post("/deathCountry",function(request,response){
  const countryDeath=request.body.countryName;
  var options = {
    'method': 'GET',
    'hostname': 'corona.lmao.ninja',
    'path': '/v2/countries/'+countryDeath+'?yesterday=true&strict=true&query%20=null',
    'headers': {
    },
    'maxRedirects': 20
  };
  var req = https.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
    //   console.log(JSON.parse(body.toString()));
    //   console.log(body.toString());
        var covidData=JSON.parse(body.toString());
        var deathdaily=covidData.todayDeaths;
        var imageURL=covidData.countryInfo.flag;
        var totalDeath=covidData.deaths;
        var deathPerPeople=covidData.oneDeathPerPeople;
        
        response.send("<body style='background-color:#C3447A; color:white;text-align:center;font-family:Arial, sans-serif;font-style:oblique;'><img src="+imageURL+"><br><br><h1>Today death recorded till now: "+deathdaily+"</h1><h2>Total deaths since 2020: "+
        totalDeath+"</h2><h2>Death Per people in "+countryDeath+": "+
        deathPerPeople+"</h2></body>");
        
    });
  
    res.on("error", function (error) {
      console.error(error);
    });
  });
  
  req.end();
})

app.get("/deathContinent",function(req,res){
  res.sendFile(__dirname+"/deathContinent.html");
})

app.post("/deathContinent",function(request,response){
  const continentName=request.body.continentName;
  var options={
      'method': 'GET',
      'hostname': 'corona.lmao.ninja',
      'path':'/v2/continents/'+continentName+'?yesterday=true&strict=false',
      'headers':{
      },
      'maxRedirects':20
  };
  var req=https.request(options,function(res){
    var chunks=[];
    res.on("data",function(chunk){
      chunks.push(chunk);
    });
    res.on("end",function(chunk){
      var body=Buffer.concat(chunks);
      var continentCovid=JSON.parse(body.toString());
      var todayDeaths=continentCovid.todayDeaths;
      var deathPerOneMillion=continentCovid.deathsPerOneMillion;
      var totalDeath=continentCovid.deaths;
      var imageURL="images/"+continentName+".jpeg";
      response.send("<body style='background-color:#C3447A; color:white;text-align:center;font-family:Arial, sans-serif;font-style:oblique;'><img src="+imageURL+"><br><br><h1>Today deaths recorded till now: "+todayDeaths+"</h1><h2>Total Deaths since 2020: "+
          totalDeath+"</h2><h2>Death Per one million people in "+continentName+": "+
          deathPerOneMillion+"</h2></body>");
    });
    res.on("error", function (error) {
      console.error(error);
    });
  });
  req.end();
})

app.get("/recoveryCountry",function(req,res){
  res.sendFile(__dirname+"/recoveryCountry.html");
})

app.post("/recoveryCountry",function(request,response){
  const countryRecovery=request.body.countryName;
  var options = {
    'method': 'GET',
    'hostname': 'corona.lmao.ninja',
    'path': '/v2/countries/'+countryRecovery+'?yesterday=true&strict=true&query%20=null',
    'headers': {
    },
    'maxRedirects': 20
  };
  var req = https.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
    //   console.log(JSON.parse(body.toString()));
    //   console.log(body.toString());
        var covidData=JSON.parse(body.toString());
        var recoverydaily=covidData.todayRecovered;
        var imageURL=covidData.countryInfo.flag;
        var totalRecovery=covidData.recovered;
        var recoveryPerPeople=covidData.recoveredPerOneMillion;
        
        response.send("<body style='background-color:#C3447A; color:white;text-align:center;font-family:Arial, sans-serif;font-style:oblique;'><img src="+imageURL+"><br><br><h1>Today recovery recorded till now: "+recoverydaily+"</h1><h2>Total recovery since 2020: "+
        totalRecovery+"</h2><h2>Recovery Per one million people in "+countryRecovery+": "+
        recoveryPerPeople+"</h2></body>");
        
    });
  
    res.on("error", function (error) {
      console.error(error);
    });
  });
  
  req.end();
})

app.get("/recoveryContinent",function(req,res){
  res.sendFile(__dirname+"/recoveryContinent.html");
})

app.post("/recoveryContinent",function(request,response){
  const continentName=request.body.continentName;
  var options={
      'method': 'GET',
      'hostname': 'corona.lmao.ninja',
      'path':'/v2/continents/'+continentName+'?yesterday=true&strict=false',
      'headers':{
      },
      'maxRedirects':20
  };
  var req=https.request(options,function(res){
    var chunks=[];
    res.on("data",function(chunk){
      chunks.push(chunk);
    });
    res.on("end",function(chunk){
      var body=Buffer.concat(chunks);
      var continentCovid=JSON.parse(body.toString());
      var todayRecovery=continentCovid.todayRecovered;
      var RecoveryPerOneMillion=continentCovid.recoveredPerOneMillion;
      var totalRecovery=continentCovid.recovered;
      var imageURL="images/"+continentName+".jpeg";
      response.send("<body style='background-color:#C3447A; color:white;text-align:center;font-family:Arial, sans-serif;font-style:oblique;'><img src="+imageURL+"><br><br><h1>Today recovery recorded till now: "+todayRecovery+"</h1><h2>Total Recoveries since 2020: "+
          totalRecovery+"</h2><h2>Recovery Per one million people in "+continentName+": "+
          RecoveryPerOneMillion+"</h2></body>");
    });
    res.on("error", function (error) {
      console.error(error);
    });
  });
  req.end();
})

app.listen(3000,function(){
    console.log("server running at port 3000");
})