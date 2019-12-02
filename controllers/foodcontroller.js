const db = require("../models")

module.exports = {
    //Food Controllers
    addFoodItems: function(req, res) {
        db.Food
        .create({food: req.body.food, calories: req.body.calories})
        .then(foodModel => {
            db.Day.findById({_id: req.body.currentDayId})
            .then(dayModel => {
                dayModel.food.push(foodModel._id)
                dayModel.totalCalCount = req.body.totalCalCount
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