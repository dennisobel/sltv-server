var Swap = require('../models/swapreq');
var mongoose = require("mongoose")

exports.getallswaps = function(req,res){  
	console.log(res.body)
	Swap
	.find({})
	.then((swaps) => {
		return res.status(200).json({
			success:true,
			data:swaps 
		});
	})
	.catch((err) => {
		return res.status(500).json({
			message: err
		})
	})	
}

exports.getswapbyid = function(req,res,next){
	Swap
	.find({phone_number:req.params.phone_number})
	.then((swaps)=>{
		return res.status(200).json({
			success:true,
			data:swaps
		});
	})
	.catch((err)=>{
		return res.status(500).json({
			message:err
		})
	})
}

exports.deleteswap = function(req,res){
	Swap 
	.remove({
		phone_number:req.params.phone_number
	},(err,result) => {
		if(err){
			res.json(err)
		}else{
			res.json(result)
		}
	})	
}

exports.createswap = function(req, res){
	console.log(req.body)
	
	var _swap = new Swap({
		tvcart: req.body.tvcart,
		moviecart: req.body.moviecart,
		phone_number: req.body.phone_number
	})
	_swap.save()
	.then(function(newSwap){
		res.status(200).json({
			success:true,
			data:newCart
		});
	})
	.catch(function(err){
		res.status(500).json({
			message:err
		})
	})
}

