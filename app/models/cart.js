var mongoose = require("mongoose")

mongoose.Promise = global.Promise;

var CartSchema = new mongoose.Schema({
	tvcart: Array,
	moviecart: Array,
	phone_number: String
})

console.log("calling CartSchema")

module.exports = mongoose.model("Cart", CartSchema)