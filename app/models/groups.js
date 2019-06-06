const mongoose = require("mongoose")
const Schema = mongoose.Schema;


mongoose.Promise = global.Promise;

var GroupSchema = new Schema({
	groupname:{type:String,unique:true,required:true},
	participants:[{type: Schema.ObjectId, ref:"User"}],
	messages:[{type: Schema.ObjectId, ref:"Message"}],
	createdon:{type:Date,default:Date.now}
})

console.log("calling TvSchema")

module.exports = mongoose.model("Groups", GroupSchema)