const db = require("../models")
module.exports = {

   //Day Controller
   createDay: function(req, res) {
    db.Day.findOne({date: req.body.date, userId: req.body.userId, weight: req.body.weight})
    .then(dbDay => {
        if (dbDay) {
            return res.json(dbDay)
        } else {
            db.Day.create(req.body)
            .then(newDbDay => {
                db.User.findById({_id: req.body.userId})
                .then(dbUser => {
                    dbUser.days.push(newDbDay._id)
                    dbUser.save()
                })
                return res.json(newDbDay)
                .catch(error => {
                    return res.status(400).json({
                        error,
                        message: 'error!',
                    })
                })
            })
            .catch(error => {
                return res.status(400).json({
                    error,
                    message: 'error!',
                })
            })
          
        }
    })
},

    updateWeight: function(req, res) {
        db.Day
        .findOne({_id: req.body.id})
        .then(dbDay => {
            dbDay.weight = req.body.weight
            dbDay.save()
            return res.json(db.Day)
        })
        .catch(err => res.status(422).json(err))
    },
    updateHeight: function(req, res) {
        db.Day
        .findOne({_id: req.body.id})
        .then(dbDay => {
            dbDay.height = req.body.height
            dbDay.save()
            return res.json(db.Day)
        })
        .catch(err => res.status(422).json(err))
    },


    //Update Nutrition for the day
    updateNutrition: function(req,res) {
        db.Day
        .findOne({_id: req.body.id})
        .then(dbDay => {
            dbDay.nutrition = req.body.nutrition
            dbDay.save()
            return res.json(db.Day)
        })
        .catch(err => res.status(422).json(err));
    },

    findDayByuserId: function(req, res) {
        db.Day
        .find({userId: req.params.userId}, null, {sort: {date: -1}, limit: 7} )
        .populate("exercises", "foods")
        .then(dbDays => {
            return res.json(dbDays)
        })
        .catch(err => res.status(422).json(err));
    },

   /* findDayByuserId: function(req, res) {
        db.Day
        .find({userId: req.params.userId}, null, {sort: {date: -1}, limit: 7} )
        .populate("foods")
        .then(dbDays => {
            return res.json(dbDays)
        })
        .catch(err => res.status(422).json(err));

    },*/
   findDayWeightByuserId: function(req, res) {
        db.Day
        .find({userId: req.params.userId}, null, {sort: {date: -1}, limit: 30} ) 
        .then(dbDays => {
            return res.json(dbDays)
        })
        .catch(err => res.status(422).json(err));
    }


}

