const mongoose = require("mongoose")
const Schema = mongoose.Schema;


mongoose.Promise = global.Promise;

var FriendSchema = new Schema({
	friend:{type: Schema.ObjectId, ref:"User"}
})

console.log("calling FriendSchema")

module.exports = mongoose.model("Friend", FriendSchema)