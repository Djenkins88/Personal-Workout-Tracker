const router = require("express").Router();
const Workout = require("../models/Workout.js");
const path = require('path');





//get index.html page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get('/exercise',(req,res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get('/stats', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

module.exports = router;


router.post("/api/workouts", (req, res) => {
 Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
      console.log(success);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  Workout.aggregate([ 
    {
      $addFields:{
        totalDuration:{
          $sum:"$excerises.duration"
        }
      }
    }

  ])
  .then((dbWorkout) => {
    res.json(dbWorkout);
    console.log(success);
  })
  .catch((err) => {
    res.status(400).json(err);
  })
})

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([ 
    {
      $addFields:{
        totalDuration:{
          $sum:"$excerises.duration"
        }
      }
    }

  ])
  .sort({_id:-1})
  .limit(7)
  .then((dbWorkout) => {
    res.json(dbWorkout);
    console.log(success);
  })
  .catch((err) => {
    res.status(400).json(err);
  })
})


module.exports = router;