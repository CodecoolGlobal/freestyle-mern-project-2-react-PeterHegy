const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const activitySchema = new Schema({
activity: String,
accessibility: String,
type: String,
participants: Number,
price: Number,
link: String,
key: Number
});

const Activity = model('Activity', activitySchema);


module.exports = Activity;