const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017'


function responseAction(collectionName,query,req, res, skipnum,limitnum) {
	
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
		const sentences = books.collection(collectionName)

		sentences.find(query).skip(skipnum * limitnum).limit(limitnum).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
}



router.get('/:page',function(req, res){

	var query = {}
	
	responseAction("poem",query, req, res,parseInt(req.params.page), 6)
})



router.get('/identifier/:poem_id/:page',function(req, res){
	var query = {
		'poem_id' : req.params.poem_id
	}
	responseAction("poem",query, req, res,parseInt(req.params.page), 0)
})


router.get('/name/:poem_title/:page',function(req, res){
	var query = {
		'poem_title' : req.params.poem_title
	}
	responseAction("poem",query, req, res,parseInt(req.params.page), 0)
})


router.get('/tag/:poem_tags/:page',function(req, res){
	var query = {
		'poem_tags' : {
			'$in' : [
				req.params.poem_tags
			]
		}
	}
	responseAction("poem",query, req, res, parseInt(req.params.page),6)
})


router.get('/author/:poem_author/:page',function(req, res){
	var query = {
		'poem_author' : req.params.poem_author + ' '
	}
	responseAction("poem",query, req, res,parseInt(req.params.page), 6)
})


router.get('/dynasty/:poem_dynasty/:page',function(req, res){
	var query = {
		'poem_dynasty' : req.params.poem_dynasty
	}
	
	responseAction("poem",query, req, res, parseInt(req.params.page),6)
})
module.exports = router









