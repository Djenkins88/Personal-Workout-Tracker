const router = require("express").Router();
const Workout = require("../models/Workout.js");
// const path = require('path');


// router.post("/api/workouts", ({body}, res) => {
//  Workout.create(body)
//     .then((dbWorkout) => {
//       res.json(dbWorkout);
//     })
//     .catch((err) => {
//       res.status(400).json(err);
//     });
// });  

router.post("/api/workouts", (req, res) => {
  Workout.create({})
     .then((dbWorkout) => {
       res.json(dbWorkout);
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
          $sum:"$excerise.duration"
        }
      }
    }

  ])
  .then((dbWorkout) => {
    res.json(dbWorkout);
  })
  .catch((err) => {
    res.status(400).json(err);
  })
});

router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([ 
   {
     $addFields:{
       totalDuration:{
         $sum:"$excerise.duration"
        }
     }
    }

  ])
  .sort({_id:-1})
  .limit(7)
  .then((dbWorkout) => {
    res.json(dbWorkout);
  })
  .catch((err) => {
    res.status(400).json(err);
  })
});


router.put("/api/workouts/:id", ({body}, res) => {
  //console.log(req.body)
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body }},
    { new: true })
    .then(dbWorkout => { res.json(dbWorkout); })
    .catch(err => { res.status(404).json(err); });
});

module.exports = router;