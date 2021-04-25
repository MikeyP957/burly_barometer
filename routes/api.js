const router = require('express').Router();
const Workout = require('../models/Workout');


//this gets only the latest workout
router.get('/api/workouts', async (req,res) => {
    try {
        const lastWorkouts = await Workout.find({})
            if(!lastWorkouts) {
                res.status(400).json({message: 'Nothing to find'})
            }
        console.log('lastWorkouts', lastWorkouts)
        // lastWorkouts.aggregate( [
        //     {
        //         $addFields: {
        //             totalDuration: { $sum: "$exercises.duration"}
        //         }
        //     }
        // ] )

        res.status(200).json(lastWorkouts)
    } catch(err) {
        res.status(500).json(err)
    }
})

router.get('/api/workouts/range', async (req,res) => {
    const lastSeven = await Workout.find({}).sort({day:1}).limit(7);
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