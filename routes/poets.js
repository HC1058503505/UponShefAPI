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
	responseAction("poet",query, req, res, parseInt(req.params.page), 6)
})


router.get('/identifier/:poet_id',function(req, res){

	var query = {
		"poet_id": req.params.poet_id
	}
	responseAction("poet",query,req,res,0,0)
})

router.get('/dynasty/:poet_dynasty/:page',function(req, res){

	var query = {
		"poet_dynasty": req.params.poet_dynasty
	}
	responseAction("poet",query,req,res,parseInt(req.params.page),6)
})


router.get('/name/:poet_name',function(req, res){

	var query = {
		"poet_name": req.params.poet_name
	}
	responseAction("poet",query,req,res,0,0)
})


module.exports = router