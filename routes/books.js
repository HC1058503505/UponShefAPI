const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017'


router.get('/',function(req, res){
	mongoClient.connect(dbURL, {useNewUrlParser:true},function(error, db){
		const meals = db.db('books')
		const caipu_list = meals.collection('guwen')

		caipu_list.find({}).project({'book_contents' : 0}).limit(10).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
})


router.get('/:book_id',function(req, res){
	mongoClient.connect(dbURL, {useNewUrlParser:true},function(error, db){
		const meals = db.db('books')
		const caipu_list = meals.collection('guwen')
		// console.log(req.params.book_id)
		// js 字符串转换数字:https://www.cnblogs.com/carekee/articles/1729574.html
		var query = {
			'book_id' : parseInt(req.params.book_id)
		}

		caipu_list.find(query).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
})

module.exports = router