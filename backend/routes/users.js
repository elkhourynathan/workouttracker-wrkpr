const express = require('express');
const User = require('../models/user.models');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require('dotenv').config();
const router = express.Router();

const Workout = require('../models/workout.models')



// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific user by username
router.get('/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Create a new user
router.post('/register', async (req, res) => {
    const user = req.body;

    // Check if username or email taken
    const takenUsername = await User.findOne({username: user.username});
    const takenEmail = await User.findOne({email: user.email});

    if( takenUsername || takenEmail){
        res.json({message: "Username or email already taken"});
    } else{
        user.password = await bcrypt.hash(req.body.password,10)

        const dbUser = new User({
            username: user.username,
            email: user.email,
            password: user.password
        })
        dbUser.save()
        res.json({message: "Success"})
    }
});

router.post('/login', (req, res) => {
    const userLoggingIn = req.body;

    User.findOne({ username: userLoggingIn.username })
        .then((dbUser) => {
            if (!dbUser) {
                return res.json({
                    message: 'Invalid Username or Password, please try again',
                });
            }
            bcrypt.compare(userLoggingIn.password, dbUser.password).then((isCorrect) => {
                if (isCorrect) {
                    const payload = {
                        id: dbUser._id,
                        username: dbUser.username,
                    };
                    jwt.sign(
                        payload,
                        process.env.JWT_SECRET,
                        { expiresIn: 86400 },
                        (err, token) => {
                            if (err) return res.json({ message: err.message }); // Send err.message instead of err
                            return res.json({
                                message: 'Success',
                                token: 'Bearer ' + token,
                            });
                        }
                    );
                } else {
                    return res.json({
                        message: 'Invalid Username or Password, please try again',
                    });
                }
            });
        });
});



// Verify JWT
function verifyJWT(req,res,next){
    const token = req.headers["x-access-token"]?.split(' ')[1]

    if(token){
        jwt.verify(token, process.env.PASSPORTSECRET, (err,decoded) =>{
            if (err) return res.json({
                isLoggedIn: false,
                message: "Failed to authneticate"
            })
            req.user = {};
            req.user.id = decoded.id;
            req.user.username = decoded.username;
            next()
        })
    } else{
        res.json({
            message: "Incorrect token Given",
            isLoggedIn: false,
        })
    }
}

router.get("/getUsername", verifyJWT, (req,res) => {
    res.json({
        isLoggedIn: true,
        username: req.user.username,
    })
})

// Update a user
router.put('/edit/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a user
router.delete('/remove/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to add a workout to a user
router.post('/:username/workouts', async (req, res) => {
    try {
        // Get the user by the username from the route parameter
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Create a new workout with the request data
        const workout = req.body;

        // Add the workout object to the user's workouts array
        user.workouts.push(workout);

        // Save the user
        await user.save();

        // Send the saved workout as a response
        res.status(201).send(workout);
    } catch (error) {
        res.status(500).send({ message: 'Error adding workout to user', error });
        console.log(error)
    }
});

// Route to remove a workout to a user
router.post('/:username/workouts/remove', async (req, res) => {
    try {
        // Get the user by the username from the route parameter
        const user = await User.findOne({ username: req.params.username });
        const workoutName = req.body.name;

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }



        // Add the workout object to the user's workouts array
        user.workouts = user.workouts.filter(workouts => workouts.name !== workoutName);

        // Save the user
        await user.save();

        // Send the saved workout as a response
        res.status(201).send(user.workouts);
    } catch (error) {
        res.status(500).send({ message: 'Error removing workout from user', error });
        console.log(error)
    }
});

module.exports = router;
