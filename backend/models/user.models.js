const mongoose = require('mongoose');
const { workoutSchema } = require('./workout.models'); 

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    workouts: [workoutSchema] 
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
