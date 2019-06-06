var mongoose = require("mongoose")

mongoose.Promise = global.Promise;

var CartSchema = new mongoose.Schema({
	tvcart: Array,
	moviecart: Array,
	phonenumber: String,
	retailer: String,
	ready: Boolean,
	delivered: Boolean
})

module.exports = mongoose.model("Cart", CartSchema)