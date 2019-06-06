var mongoose = require("mongoose")

mongoose.Promise = global.Promise;

var SwapSchema = new mongoose.Schema({
	tvcart: Array,
	moviecart: Array,
	phone_number: String
})

module.exports = mongoose.model("Swap", SwapSchema)