const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date(),
  },
  
  exercises: [{
      type: {
        type: String,
        trim: true,
        required: "please enter an execrise type",
      },

      name: {
        type: String,
        trim: true,
        required: "please enter an execrise name",
      },

      duration: {
        type: Number,
        required: "please enter your time in minutes",
      },

      weight: Number,
      reps: Number,
      sets: Number,
      distance: Number,
    }]
});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;