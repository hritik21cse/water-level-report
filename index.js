const path = require('path')
const express = require('express')
const app = express()


console.log('Welcome to Node')

// serve up the static files
app.use(express.static(__dirname + '/public/'))


const initialData = [
    {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      waterLevel: 11,
      status: "danger",
      latitude: "16.23456 N",
      longitude: "80.4567 E",
    },
];


let waterDataTransferToClient = null;

const sendWaterLevelData = (waterDataRes) => {
  waterDataRes.write("data: " + JSON.stringify(initialData) + "\n\n");
  return (data) => {
    waterDataRes.write("data: " + JSON.stringify(data) + "\n\n");
    console.log("sendWaterLevelData called");
    // waterDataRes.end();
    setTimeout(() => {
      waterDataRes.write("data: " + JSON.stringify(initialData) + "\n\n");
    }, 5000);
  };
};
  
  
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'))
})

app.get("/waterLevelReports", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
  waterDataTransferToClient = sendWaterLevelData(res);
});

app.post("/waterLevelDetails", express.json(), (req, res) => {
    console.log("post request", req.body);
    waterDataTransferToClient && waterDataTransferToClient([req.body]);
    res.send("received the request successfully");
});


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server started on port ${PORT}`))