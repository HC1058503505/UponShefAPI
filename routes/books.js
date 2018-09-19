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

/**
 * @api {get} /books/:page 分页古书籍列表
 * @apiSampleRequest http://localhost:3000/books/:page
 * @apiDescription 分页古书籍列表
 * @apiName 分页古书籍列表
 * @apiGroup Books
 * @apiParam {Int} page 页数
 * @apiSuccessExample {json} Success-Response:
 * [
 *	{
 *		"_id": "5b9b35f0aaa98b0dfadf42ca",
 *		"book_abstract": "《般若波罗蜜多心经》也称为《摩诃般若波罗蜜多心经》，简称《般若心经》或《心经》，是般若经系列中一部言简义丰、博大精深、提纲挈领、极为重要的经典，为大乘佛教出家及在家佛教徒日常背诵的佛经。现以唐代三藏法师玄奘译本为最流行。",
 *		"book_img": "xinjing.jpg",
 *		"book_id": 152,
 *		"book_name": "心经"
 *	},
 * 	{
 *	 	"_id": "5b9b35efaaa98b0dfadf42c7",
 *  	"book_abstract": "《三十六计》或称“三十六策”，是指中国古代三十六个兵法策略，语源于南北朝，成书于明清。它是根据我国古代卓越的军事思想和丰富的斗争经验总结而成的兵书，是中华民族悠久文化遗产之一。► 1条名句",
 *		"book_img": "sanshiliuji.jpg",
 *		"book_id": 4,
 *		"book_name": "三十六计"
 *	}
 *	.
 *	.
 *	.
 * ]
 * @apiVersion 1.0.0
 */

router.get('/:page',function(req, res){
   var query = {

   }

   var project = {'book_contents' : 0}
   responseAction("guwen",query,project,req, res, parseInt(req.params.page),10)
})


/**
 * @api {get} /books/book_id/:book_id 根据book_id查询古书
 * @apiSampleRequest http://localhost:3000/books/book_id/:book_id
 * @apiDescription 根据book_id查询古书
 * @apiName 根据book_id查询古书
 * @apiGroup Books
 * @apiParam {Int} book_id 古书id
 * @apiSuccessExample {json} Success-Response:
 * {
 *		"_id": "5b9b35f0aaa98b0dfadf42ca",
 *		"book_abstract": "《般若波罗蜜多心经》也称为《摩诃般若波罗蜜多心经》，简称《般若心经》或《心经》，是般若经系列中一部言简义丰、博大精深、提纲挈领、极为重要的经典，为大乘佛教出家及在家佛教徒日常背诵的佛经。现以唐代三藏法师玄奘译本为最流行。",
 *		"book_img": "xinjing.jpg",
 *		"book_id": 152,
 *		"book_name": "心经"
 * }
 * @apiVersion 1.0.0
 */
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