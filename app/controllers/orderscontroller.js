var Order = require('../models/orders');
var User = require('../models/user');
//var myParser = require("body-parser");
var mongoose = require("mongoose")

//mongoose.Promise = global.Promise;

exports.getorder = function(req,res){  	
	Order.find({phone_number:req.params.phonenumber})
	.then((orders)=>{
		console.log(orders)
		return res.status(200).json({
			success:true,
			data:orders
		});
	})
	.catch((err)=>{
		return res.status(500).json({
			message:err
		})
	})
}

exports.getorders = function(req,res){
	Order
	.find({})
	.then((orders) => {
		return res.status(200).json({
			success:true,
			data:orders 
		});
	})
	.catch((err) => {
		return res.status(500).json({
			message: err
		})
	})		
}

exports.createorder = function(req, res){
	console.log(req.body)
	const {
		tvcart,
		moviecart,
		phone_number,
		createdon
	} = req.body
	
	var _order = new Message({
		tvcart,
		moviecart,
		phone_number,
		createdon
	})
	_order.save()
	.then(function(newOrder){
		console.log(newOrder)
		res.status(200).json({
			success:true,
			data:newOrder
		});
	})
	.catch(function(err){
		res.status(500).json({
			message:err
		})
	})
}



exports.deleteOrder = function(req, res){
	Order.remove({
		_id:req.params.phone_number
	},(err,result) => {
		if(err){
			res.json(err)
		}else{
			res.json(result)
		}
	})
}