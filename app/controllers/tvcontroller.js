var Tv = require('../models/tv');
var User = require('../models/user');
//var myParser = require("body-parser");
var mongoose = require("mongoose")

//mongoose.Promise = global.Promise;

exports.gettv = function(req,res){  	
	Tv.find({userId:req.params.id})
	.then((tvs)=>{
		console.log(tvs)
		return res.status(200).json({
			success:true,
			data:tvs
		});
	})
	.catch((err)=>{
		return res.status(500).json({
			message:err
		})
	})
}

exports.createtv = function(req, res){
	console.log(req.body)
	const {
		tvid,
		title,
		season_number,
		episode_count,
		poster_path,
		userId
	} = req.body
	
	var _tv = new Tv({
		tvid,
		title,
		season_number,
		episode_count,
		poster_path,
		userId
	})
	_tv.save()
	.then(function(newTv){
		res.status(200).json({
			success:true,
			data:newTv
		});
	})
	.catch(function(err){
		res.status(500).json({
			message:err
		})
	})
}

exports.deletetv = function(req, res){
	Tv.remove({
		_id:req.params.id
	},(err,result) => {
		if(err){
			res.json(err)
		}else{
			res.json(result)
		}
	})
}