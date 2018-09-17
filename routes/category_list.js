const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = "mongodb://localhost:27017"

router.get('/',function(req, res) {
	mongoClient.connect(dbURL, {useNewUrlParser:true},function (error, db) {
		const meals = db.db('meals')
		const category_list = meals.collection('category_list')
		category_list.find({}).toArray(function(error, docs) {
            res.send(docs)         
            res.end()
            db.close()
        })
	})
})

router.get('/:category_type', function (req, res) {	
	mongoClient.connect(dbURL, {useNewUrlParser:true},function (error, db) {
		const meals = db.db('meals')
		const category_list = meals.collection('category_list')
		const category_type = req.params.category_type
		category_list.find({'recipe_type' : category_type}).toArray(function (error, docs) {
			res.send(docs[0])
			res.end()
			db.close()
		})

	})
})
module.exports = router