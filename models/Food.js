const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    food: { type: String, required: true },
    calories: {type: String, required: true}
});

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;