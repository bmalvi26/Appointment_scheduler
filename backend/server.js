const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");


// const API_KEY = "bL8_EDAIRdmUjeD1jc-eag";
// const API_SECRET = "5vigQbRGXNGTqTWG6WH8k2kdiCVVU5g93TGZ";

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
  }))


app.post("/generateZoomLink", async (req, res) => {
    const { topic, userId } = req.body;
    
    
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImJMOF9FREFJUmRtVWplRDFqYy1lYWciLCJleHAiOjE2ODE4ODU3NTAsImlhdCI6MTY4MTI4MDk1MX0.mJlslEamYdy-i_CIE8X-0caCWzEY4Ezwc47ogeo49MQ';
    axios.post(
        `https://api.zoom.us/v2/users/${req.body.userId}/meetings`,
        {
          topic: req.body.topic,
          type: 2,
          settings: {
            host_video: true,
            participant_video: true
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "User-Agent": "Zoom-api-Jwt-Request",
            "content-type": "application/json"
          }
        }
      ).then(response =>{
        res.send({
          joinUrl: response.data.join_url,
          meetingId: response.data.id,
          password: response.data.password
        });
      }).catch(err =>{
        console.log(err);
      })
  
    
  });
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
