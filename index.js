const path = require('path')
const express = require('express')
const app = express()


console.log('Welcome to Node')

// serve up the static files
app.use(express.static(__dirname + '/public/'))


const waterLevel = [
    {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      waterLevel: 11,
      status: "danger",
      latitude: "16.23456 N",
      longitude: "80.4567 E",
    },
  ];
  
  
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
})

app.get("/waterLevelReports", (req, res) => {
    res.json(waterLevel);
});

app.post("/waterLevelDetails", express.json(), (req, res) => {
    console.log("post request", req.body);
    waterLevel.push(req.body);
    res.send("received the request successfully");
});


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server started on port ${PORT}`))