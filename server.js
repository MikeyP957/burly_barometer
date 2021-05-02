const express = require("express");
const mongoose = require("mongoose");
const router = require('express').Router();
const Workout = require('./models/Workout');
const route = require('express').Router();
const path = require('path');


// const Workout = require('./models/workoutSchema')
const PORT = process.env.PORT || 4040

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//  localhost/workout
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes

//this gets only the latest workout
router.get('/api/workouts', async (req,res) => {
    try {
        const lastWorkouts = await Workout.aggregate([

            {$addFields: {totalDuration: {$sum: '$exercises.duration'}}}
        ])
            if(!lastWorkouts) {
                res.status(400).json({message: 'Nothing to find'})
            }
        console.log('lastWorkouts', lastWorkouts)


        res.status(200).json(lastWorkouts)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/api/workouts/range', async (req,res) => {
    const lastSeven = await Workout.aggregate([
        {$addFields: {
            totalDuration: {$sum: '$exercises.duration'},
            totalWeight: {$sum: '$exercises.weight'}
        }}
    ]).limit(7);
    if(!lastSeven){
        consol.log('there is nothing here')
    }
    console.log("sorted workouts", lastSeven)
    res.status(200).json(lastSeven)
    
    //finish this (order by date, render top 7)
})

router.get('/api/workouts/:id', async (req,res) => {
    try{
        const oneWorkout = await Workout.findOne({_id: req.params.id })

        res.status(200).json(oneWorkout)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/api/workouts', async ({body}, res) => {
    const workout = new Workout({
        exercises: [{
            type: body.type,
            name: body.name,
            duration: body.duration,
            distance: body.distance,
            weight: body.weight,
            reps: body.reps,
            sets: body.sets
        }]

    })
    
    try {
        const newWorkout = await workout.save()

        console.log('newWorkout', newWorkout)

        res.json(newWorkout)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/api/workouts/:id', async (req,res) => {
   
    try{
        const updateWorkout = await Workout.findOneAndUpdate({__id: req.params.id}, {$push: {exercises: req.body}})
           console.log("updateworkout", updateWorkout)
        res.json(updateWorkout)
    } catch(err) { 
        res.status(400).json(err)
    }

})

route.get('/exercise', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

route.get('/stats', (req, res) => {
    
    res.sendFile(path.join(__dirname, '../public/stats.html'));
});

app.use(router)
app.use(route)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
