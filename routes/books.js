const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017'

function responseAction(collectionName,query,project,req, res, skipnum,limitnum) {
	
	if (typeof(skipnum) != 'number') {
		res.send("请输入整数page")
		res.end()
		return
	}

	if (typeof(limitnum) != 'number') {
		res.send("请输入整数limitnum")
		res.end()
	}

	
	mongoClient.connect(dbURL, {useNewUrlParser:true},function(error, db){
		const books = db.db('books')
		const guwen = books.collection(collectionName)
		console.log(project)
		guwen.find(query).project(project).skip(skipnum * limitnum).limit(limitnum).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
}

router.get('/:page',function(req, res){
   var query = {

   }

   var project = {'book_contents' : 0}
   responseAction("guwen",query,project,req, res, parseInt(req.params.page),10)
})


router.get('/book_id/:book_id',function(req, res){
	// console.log(req.params.book_id)
	// js 字符串转换数字:https://www.cnblogs.com/carekee/articles/1729574.html
	var query = {
		'book_id' : parseInt(req.params.book_id)
	}
	var project = {}
	responseAction("guwen",query,project,req, res, 0, 0)
})

module.exports = router