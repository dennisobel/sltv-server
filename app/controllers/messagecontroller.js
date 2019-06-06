var Message = require('../models/message');
var User = require('../models/user');
//var myParser = require("body-parser");
var mongoose = require("mongoose")

//mongoose.Promise = global.Promise;

exports.getmessage = function(req,res){  	
	Message.find({recepient:req.params.phone_number})
	.then((messages)=>{
		console.log(messages)
		return res.status(200).json({
			success:true,
			data:messages
		});
	})
	.catch((err)=>{
		return res.status(500).json({
			message:err
		})
	})
}

exports.getmessages = function(req,res){
	Message
	.find({})
	.then((messages) => {
		return res.status(200).json({
			success:true,
			data:messages 
		});
	})
	.catch((err) => {
		return res.status(500).json({
			message: err
		})
	})		
}



exports.createmessage = function(req, res){
	console.log(req.body)
	const {
		data,
		type,
		recepient,
		sender,
		createdon
	} = req.body
	
	var _message = new Message({
		data,
		type,
		recepient,
		sender,
		createdon
	})
	_message.save()
	.then(function(newMessage){
		console.log(newMessage)
		res.status(200).json({
			success:true,
			data:newMessage
		});
	})
	.catch(function(err){
		res.status(500).json({
			message:err
		})
	})
}



exports.deletemessage = function(req, res){
	Message.remove({
		_id:req.params.id
	},(err,result) => {
		if(err){
			res.json(err)
		}else{
			res.json(result)
		}
	})
}