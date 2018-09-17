const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017'

router.get('/',function(req, res){
	mongoClient.connect(dbURL,{useNewUrlParser:true}, function(error, db){
		const meals = db.db('books')
		const caipu_list = meals.collection('bookscategory')

		caipu_list.find({}).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
})


module.exports = router


// mongodb 分组查询
// https://www.cnblogs.com/luoliangfei/p/7568254.html


// caipu_list.aggregate([{
// 								'$group' : {
// 											  '_id' : '$book_category',
// 											  'sub_category' : {

// 											  						'$push' : {
// 											  										'book_section' : '$book_sub_category', 
// 											  										'books_id' : '$books_id'
// 											  									}
// 											  					}
// 											}
// 								}])