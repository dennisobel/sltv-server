const db = require("./../models");
// let soket = require('../sockets/socket');
let soket = require('../../index')

const GetCart = {}
const GetCartById = {}
const DeleteCartById = {}
const CreateCart = {}
const Delivered = {}
const Ready = {}

GetCart.get = (req,res) => {  
	console.log(res.body)
	db.CartSchema
	.find({})
	.then((carts) => {
		return res.status(200).json({
			success:true,
			data:carts 
		});
	})
	.catch((err) => {
		return res.status(500).json({
			message: err
		})
	})	
}

GetCartById.get = (req,res,next) => {
	console.log("incoming req:",req.params)
	db.CartSchema
	.find({retailer:req.params.id})
	.then((carts)=>{
		return res.status(200).json({
			success:true,
			data:carts
		});
	})
	.catch((err)=>{
		return res.status(500).json({
			message:err
		})
	})
}

DeleteCartById.delete = function(req,res){
	db.CartSchema
	.remove({
		phonenumber:req.params.phonenumber
	},(err,result) => {
		if(err){
			res.json(err)
		}else{
			res.json(result)
		}
	})	
}

Delivered.post = (req,res) => {
	console.log("DELIVERED:",req.body)
	db.CartSchema
	.findOneAndUpdate({
		phonenumber:req.body.phonenumber
	},{
		delivered:true
	})
	.then(()=>{
		return res.status(200).json({
			success:true
		})
	})
	.catch(function(err){
		res.status(500).json({
			message:err
		})
	})
}

Delivered.get = (req,res) => {
	db.CartSchema
	.find({
		delivered:true
	})
	.then(docs => {
		return res.status(200).json({
			success:true,
			delivered:docs
		})
	})
	.catch(function(err){
		res.status(500).json({
			message:err
		})
	})
}

Ready.post = (req,res) => {
	db.CartSchema
	.findOneAndUpdate({
		phonenumber:req.body.phonenumber
	},{
		ready:true
	})
	.then(()=>{
		return res.status(200).json({
			success:true
		})
	})
	.catch(function(err){
		res.status(500).json({
			message:err
		})
	})
}


CreateCart.post = (req, res) => {
	console.log("INCOMING ORDER",req.body)
	
	
	var _cart = db.CartSchema({
		tvcart: req.body.tvshows,
		moviecart: req.body.movies,
		phonenumber: req.body.phonenumber,
		retailer: req.body.retailer
	})
	.save()
	.then(function(_cart){
		return res.status(200).json({
			success:true,
			data:_cart
		});
	})
	.catch(function(err){
		res.status(500).json({
			message:err
		})
	})
	
}

module.exports = {
    GetCart,
    GetCartById,
    DeleteCartById,
	CreateCart,
	Delivered,
	Ready
}