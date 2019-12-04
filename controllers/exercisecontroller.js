const db = require("../models")
const moment = require("moment")
module.exports = {
    //Exercise Controllers
    addExercise: function(req, res) {
        db.Exercise
        .create({exercise: req.body.exercise, duration: req.body.duration})
        .then(exerciseModel => {
            db.Day.findById({_id: req.body.currentDayId})
            .then(dayModel => {
                dayModel.exercises.push(exerciseModel._id)
                dayModel.totalActivity = req.body.totalActivity
                dayModel.save()
                return res.status(200)
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'error!',
                })
            })
            return res.status(200)
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'error!',
            })
        })
    },

}