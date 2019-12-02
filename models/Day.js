const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema({
    userId: { type: Schema.Types.ObjectId },
    date: { type: Date, default: Date.now },
    exercises: [{ type: Schema.Types.ObjectId, ref: "Exercise" }],
<<<<<<< HEAD
    food: [{type: Schema.Types.ObjectId, ref: "Food" }],
=======
    // foods: [{type: Schema.Types.ObjectId, ref: "Food" }],
>>>>>>> 7c7f8cce1159b6871388d8d2d1504126c083fb7b
    nutrition: { type: Number, default: 0 },
    totalActivity: { type: Number, default: 0 },
    // totalCalCount: { type: Number, default: 0 },
    weight: {type: Number},
    height: {type: Number}
}); 

const Day = mongoose.model("Day", daySchema);

module.exports = Day;