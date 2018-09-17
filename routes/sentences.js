const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017'


router.get('/',function(req, res){
	mongoClient.connect(dbURL, {useNewUrlParser:true},function(error, db){
		const meals = db.db('books')
		const caipu_list = meals.collection('sentences')

		caipu_list.find({}).limit(10).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
})


module.exports = router