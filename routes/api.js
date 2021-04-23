const router = require('express').Router();
const Workout = require('../models/Workout');

router.post('/api/workouts', async ({body}, res) => {
    console.log('**************************');
    console.log('creating a workout');
        try {
            const newWorkout = await Workout.create({
                type: body.type,
                name: body.name,
                duration: body.duration
            })
            if(!newWorkout){
                res.status(400).json({message: "Nothing to create"})
            }
            console.log('newWorkout', newWorkout)
            res.status(200).json(newWorkout)
        } catch (err) {
            res.status(500).json(err)
        }
})
//this needs to get one workout
router.get('/api/workouts', async (req,res) => {
    try {
        console.log('trying to get all the workouts')

        const lastWorkouts = await Workout.find({}).sort({date: -1});
        if(!lastWorkouts) {
            res.status(400).json({message: 'Nothing to find'})
        }
        console.log('lastWorkouts', lastWorkouts)

        res.status(200).json(lastWorkouts)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.put('/api/workouts/:id', async (req,res) => {
    console.log('one Workout')
    try{
        const newWorkoutId = await Workout.findOne({__id: req.params.id})
        console.log('new workout id', newWorkoutId)
    
        res.send(newWorkoutId)
    } catch(err) { 
        res.status(404).json(err)
    }

})

router.get('/api/workouts/range', async (req,res) => {
    const lastSeven = await Workout.find({}).sort({date: -1});
    if(!lastSeven){
        consol.log('there is nothing here')
    }
    console.log("sorted workouts", lastSeven)
    res.status(200).json(lastSeven)
    
    //finish this (order by date, render top 7)
})
// router.post('/api/workouts/bulk', ({body}, res) => {
//     console.log('body', body)
    
// })
// //agregate, add fields
// router.get('/api/workouts', (req, res) => {
//     console.log('**************************');
    
// })

// //get by id
// router.get('/api/workouts:id', (req, res) => {
    
// })

module.exports = router;