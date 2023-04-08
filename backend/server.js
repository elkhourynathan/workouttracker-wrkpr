const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.port || 8000;

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Access-Token']
  }));
  
// bodyParser middleware to receive form data
const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json(),urlencodedParser);


// connect to mongoDB database
const dbURI = "mongodb+srv://elkhourynathan:wrkprTEMPpass@mkr-pr.gaes2w2.mongodb.net/?retryWrites=true&w=majority"

const usersRouter = require('./routes/users');
const workoutsRouter = require('./routes/workouts');

app.use('/workouts', workoutsRouter);
app.use('/users',usersRouter);


mongoose.connect(dbURI, {useNewURLParser:true, useUnifiedTopology:true})
.then((res) => {
    // Listen for requests when database data has loaded
    app.listen(port, () => console.log(`Server live, DB connected, running on ${port}`));
})
.catch(err => console.log(err));

