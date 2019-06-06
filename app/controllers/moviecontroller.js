var Movie = require('../models/movies');
var mongoose = require("mongoose")

exports.getmovie = function(req,res){  
	console.log(res.body)
	Movie
	.find({userId:req.params.id})
	.then((movies) => {
		return res.status(200).json({
			success:true,
			data:movies 
		});
	})
	.catch((err) => {
		return res.status(500).json({
			message: err
		})
	})	
}

exports.createmovie = function(req, res){
	console.log("calling createmovie")
	const {
		movieid,
		title,
		poster_path,
		userId
	} = req.body	
	
	var _movie = new Movie({
		movieid,
		title,
		poster_path,
		userId
	})
	_movie.save()
	.then(function(newMovie){
		res.status(200).json({
			success:true,
			data:newMovie
		});
	})
	.catch(function(err){
		res.status(500).json({
			message:err
		})
	})
}

exports.deletemovie = function(req, res){
	Movie.remove({
		_id:req.params.id
	},(err,result) => {
		if(err){
			res.json(err)
		}else{
			res.json(result)
		}
	})
}