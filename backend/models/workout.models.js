const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
});

const workoutSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    exercises: [exerciseSchema]
}, {
    timestamps: true,
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = {
    Workout,
    workoutSchema // Export the workoutSchema so it can be imported in other files
};
