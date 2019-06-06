const mongoose = require("mongoose")
const Schema = mongoose.Schema;


mongoose.Promise = global.Promise;

var TvSchema = new Schema({
	tvid:Number,
	title:String,
	season_number:Number,
	episode_count:Number,
	poster_path:String,
	userId:{type: Schema.ObjectId, ref:"User"}
})

console.log("calling TvSchema")

module.exports = mongoose.model("Tv", TvSchema)