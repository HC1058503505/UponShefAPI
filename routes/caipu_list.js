const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017'

router.get('/:caipu',function (req, res) {
	mongoClient.connect(dbURL, function(error, db){
		const meals = db.db('meals')
		const caipu_type = req.params.caipu
		const caipu_list = meals.collection(caipu_type)

		caipu_list.find({}).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
})

router.get('/:caipu/page/:page',function (req, res) {
	mongoClient.connect(dbURL, function(error, db){
		const meals = db.db('meals')
		const caipu_type = req.params.caipu
		const page = req.params.page
		const caipu_list = meals.collection(caipu_type)

		caipu_list.find({}).skip(page * 18).limit(18).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
})


router.get('/:caipu/identifier/:caipu_id',function (req, res) {
	mongoClient.connect(dbURL, function (error, db) {
		const meals = db.db('meals')
		const caipu_type = req.params.caipu + '_steps'
		const caipu_id = req.params.caipu_id
		const caipu_list = meals.collection(caipu_type)
		caipu_list.find({'recipe_id' : caipu_id}).toArray(function (error, docs) {
			res.send(docs[0])
			res.end()
			db.close()
		})
	})
})
module.exports = router