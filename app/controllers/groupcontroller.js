var Group = require('../models/groups');
var User = require('../models/user');
//var myParser = require("body-parser");
var mongoose = require("mongoose")

//mongoose.Promise = global.Promise;

exports.getgroup = function(req,res){  	
	Group.find({userId:req.params.id})
	.then((groups)=>{
		console.log(groups)
		return res.status(200).json({
			success:true,
			data:groups
		});
	})
	.catch((err)=>{
		return res.status(500).json({
			message:err
		})
	})
}

exports.creategroup = function(req, res){
	console.log(req.body)
	const {
		groupname,
		participants,
		messages
	} = req.body
	
	var _group = new Group({
		groupname,
		participants,
		messages
	})
	_group.save()
	.then(function(newGroup){
		res.status(200).json({
			success:true,
			data:newGroup
		});
	})
	.catch(function(err){
		res.status(500).json({
			message:err
		})
	})
}

exports.deletegroup = function(req, res){
	Group.remove({
		_id:req.params.id
	},(err,result) => {
		if(err){
			res.json(err)
		}else{
			res.json(result)
		}
	})
}