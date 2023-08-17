const express = require('express');
const TripModel = require('../model/trip.model');
const tripRoute = express.Router();

tripRoute.post("/addtrip", async (req, res) => {
    const payload = req.body;
    console.log("payload", payload);
    const data = new TripModel(payload); 
    await data.save();
    res.send({
        msg: "Trip added successfully"
    });
});

tripRoute.get("/gettrip", async (req, res) => {
    try {
        const data = await TripModel.find(); 
        res.send({
            msg: data
        });
    } catch (error) {
        console.error("Error fetching trips:", error);
        res.status(500).send({
            msg: "Error fetching trips"
        });
    }
});

tripRoute.delete("/deletetrip/:id", async (req, res) => {
  const id = req.params.id;
  console.log("back", id)
  const data = await TripModel.findByIdAndDelete( {_id : id});
  
  res.send({
    msg:"Trip deleted"
  })
})

//fil
tripRoute.get("/gettrip/:destination", async (req, res) => {
    try {
      const {destination} = req.params;
      console.log("destination: " + destination)
      const data = await TripModel.find({ destination: destination });
      res.send({
        msg: data
      });
    } catch (error) {
      console.error("Error fetching filtered trips:", error);
      res.status(500).send({
        msg: "Error fetching filtered trips"
      });
    }
  });

  //sort
  tripRoute.get("/getsort/:sort", async (req, res) => {
    try {
      const sortKey = req.params.sort;
      const order = sortKey === 'desc' ? -1 : 1;
  
      const data = await TripModel.find().sort({ budget: order });
      res.send({
        msg: data
      });
    } catch (error) {
      console.error("Error fetching trips:", error);
      res.status(500).send({
        msg: "Error fetching trips"
      });
    }
  });
  

  //noth
  tripRoute.get("/gettrip/both", async (req, res) => {
    try {
      const destination = req.query.destination || null;
      const sortKey = req.query.sort || "budget";
      let data;
  
      if (destination) {
        data = await TripModel.find({ destination: destination }).sort({
          [sortKey]: 1
        });
      } else {
        data = await TripModel.find().sort({ [sortKey]: 1 });
      }
  
      res.send({
        msg: data
      });
    } catch (error) {
      console.error("Error fetching trips:", error);
      res.status(500).send({
        msg: "Error fetching trips"
      });
    }
  });
  
  
  
  

module.exports = tripRoute;
