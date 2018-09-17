const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017'


function responseAction(query,req, res, limitnum) {
	mongoClient.connect(dbURL, {useNewUrlParser:true},function(error, db){
		const books = db.db('books')
		const sentences = books.collection('sentences')

		sentences.find(query).limit(limitnum).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
}

router.get('/',function(req, res){
	var query = {}
	responseAction(query, req,res, 10)
})



router.get('identifier/:sentence_id/type/:sentence_type',function(req, res){
	
		var query = {
			'sentence_id' : req.params.sentence_id,
			'sentence_type' : req.params.sentence_type
		}
		console.log(req.params.sentence_id)
		console.log(req.params.sentence_type)
		responseAction(query,req, res, 0)
})


router.get('/identifier/:sentence_id',function(req, res){
	
		var query = {
			'sentence_id' : req.params.sentence_id
		}
		console.log(req.params.sentence_id)
		responseAction(query,req, res, 0)
})


router.get('/type/:sentence_type',function(req, res){
	
		var query = {
			'sentence_type' : req.params.sentence_type
		}
		console.log(req.params.sentence_type)
		responseAction(query,req, res, 10)
})




module.exports = router

