const mongoose = require("mongoose")
const Schema = mongoose.Schema;


mongoose.Promise = global.Promise;

var MovieSchema = new Schema({
	movieid:Number,
	title:String,
	poster_path:String,
	userId:{type: Schema.ObjectId, ref:"User"}
})

console.log("calling TvSchema")

module.exports = mongoose.model("Movie", MovieSchema)