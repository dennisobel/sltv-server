var Friend = require('../models/friends');
var User = require('../models/user');
//var myParser = require("body-parser");
var mongoose = require("mongoose")

//mongoose.Promise = global.Promise;

exports.addfriend = function(req,res){
    // var query = {'_id':req.body.loggeduser._id}
    // User.findOneAndUpdate(query,{friends:req.body.user._id}, {upsert:true}, function(err,doc){
    //     if(err) return res.send(500,{error:err});
    //     return res.send("successfully saved")
    // })  
	const {
		friend
	} = req.body.loggeduser._id

    let _friend = new Friend({
    	friend
    }) 

    _friend.save()


}

// exports.getfriend = function(req,res){  	
// 	Friend.find({userId:req.params.id})
// 	.then((friends)=>{
// 		console.log(friends)
// 		return res.status(200).json({
// 			success:true,
// 			data:friends
// 		});
// 	})
// 	.catch((err)=>{
// 		return res.status(500).json({
// 			message:err
// 		})
// 	})
// }

// exports.getfriends = function(req,res){
// 	Friend.find({})
// 	.then((friends)=>{
// 		return res.status(200).json({
// 			success:true,
// 			data:friends
// 		});
// 	})
// 	.catch((err)=>{
// 		return res.status(200).json({
// 			message:err
// 		})
// 	})
// }

exports.deletefriend = function(req,res){  	
	Friend.remove({
		_id:req.params.id
	},(err,result) => {
		if(err){
			res.json(err)
		}else{
			res.json(result)
		}
	})
}