const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017'

/**
 * @api {get} /bookscategory 古书类别列表
 * @apiSampleRequest http://localhost:3000/bookscategory
 * @apiDescription 古书类别列表
 * @apiName 古书类别列表
 * @apiGroup Books
 * @apiSuccessExample {json} Success-Response:
[{
	"_id": "5ba0c8bcab86c504389b764e",
	"category": "史部",
	"sub_category": [{
				"book_section": "史评类",
				"book_items": []
			},
			{
				"book_section": "目录类",
				"book_items": []
			},
			{
				"book_section": "政书类",
				"book_items": []
			},
			{
				"book_section": "职官类",
				"book_items": []
			},
			{
				"book_section": "地理类",
				"book_items": [{
					"book_abstract": "《徐霞客游记》是以日记体为主的地理著作，明末地理学家徐弘祖（一作宏祖，号霞客）经34年旅行，写有天台山、雁荡山、黄山、庐山等名山游记17篇和《浙游日记》、《江右游日记》、《楚游日记》、《粤西游日记》、《黔游日记》、《滇游日记》等著作，除佚散者外，遗有60余万字游记资料，死后由他人整理成《徐霞客游记》。世传本有10卷、12卷、20卷等数种，主要按日记述作者1613～1639年间旅行观察所得，对地理、水文、地质、植物等现象，均作详细记录，在地理学和文学上卓有重要的价值。",
					"bookcategory": "67",
					"book_name": "徐霞客游记",
					"book_img": "https://img.gushiwen.org/bookPic/xuxiakeyouji.jpg"
				}, {
					"book_abstract": "《水经注》是南北朝时期北魏郦道元的著作。从书名来看，此书是另一种叫做《水经》的书作《注》。事情的确如此，三国时期的一位已经不知名的作者写了一本名叫《水经》的书，内容非常简略，全书只有八千二百多字，每一条写在此书上的河流，都是公式化的：发源、简单的流程、入海，或在何处汇入另一条大河。全书《注》文超过《经》文二十多倍。《水经注》是一部三十多万的巨构，是一部独立的古典名著。",
					"bookcategory": "77",
					"book_name": "水经注",
					"book_img": "https://img.gushiwen.org/bookPic/shuijingzhu.jpg"
				}, {
					"book_abstract": "《大唐西域记》，地理史籍，又称《西域记》，12卷。玄奘述，辩机撰文。本书系玄奘奉唐太宗敕命而著，贞观二十年（646）成书。书中综叙了贞观元年（一说贞观三年）至贞观十九年玄奘西行之见闻。记述了玄奘所亲历110个及得之传闻的28个城邦、地区、国家之概况，有疆域、气候、山川、风土、人情、语言、宗教、佛寺以及大量的历史传说、神话故事等。为研究中古时期中亚、南亚诸国的历史、地理、宗教、文化和中西交通的珍贵资料，也是研究佛教史学、佛教遗迹的重要文献。",
					"bookcategory": "117",
					"book_name": "大唐西域记",
					"book_img": "https://img.gushiwen.org/bookPic/datangxiyuji.jpg"
				}, {
					"book_abstract": "《东京梦华录》是宋代孟元老的笔记体散记文，创作于宋钦宗靖康二年（1127年），是一本追述北宋都城东京开封府城市风俗人情的著作。所记大多是宋徽宗崇宁到宣和（1102-1125）年间北宋都城东京开封的情况，描绘了这一历史时期居住在东京的上至王公贵族、下及庶民百姓的日常生活情景，是研究北宋都市社会生活、经济文化的一部极其重要的历史文献古籍。",
					"bookcategory": "171",
					"book_name": "东京梦华录",
					"book_img": "https://img.gushiwen.org/bookPic/dongjingmenghualu.jpg"
				}, {
					"book_abstract": "《洛阳伽蓝记》简称《伽蓝记》，中国古代佛教史籍。是东魏迁都邺城十余年后，抚军司马杨炫之重游洛阳，追记劫前城郊佛寺之盛，概况历史变迁写作的一部集历史、地理、佛教、文学于一身的历史和人物故事类笔记，成书于公元547年（东魏武定五年）。后世将《洛阳伽蓝记》与郦道元的《水经注》、颜之推的《颜氏家训》并称为中国北朝时期的三部杰作。",
					"bookcategory": "172",
					"book_name": "洛阳伽蓝记",
					"book_img": "https://img.gushiwen.org/bookPic/luoyangjialanji.jpg"
				}, {
					"book_abstract": "《武林旧事》成书于元至元二十七年(1290)以前，为追忆南宋都城临安城市风貌的著作，全书共十卷。作者按照“词贵乎纪实”的精神﹐根据目睹耳闻和故书杂记﹐详述朝廷典礼﹑山川风俗﹑市肆经纪﹑四时节物﹑教坊乐部等情况﹐为了解南宋城市经济文化和市民生活﹐以及都城面貌﹑宫廷礼仪﹐提供较丰富的史料。",
					"bookcategory": "173",
					"book_name": "武林旧事",
					"book_img": "https://img.gushiwen.org/bookPic/wulinjiushi.jpg"
				}, {
					"book_abstract": "又名《法显传》、《历游天竺记》、《昔道人法显从长安行西至天竺传》、《释法显行传》、《历游天竺记传》、等，一卷。东晋法显撰，成于义熙十二年(416)。《佛国记》一卷，全文13980字，全部记述作者公元399至413年的旅行经历，体裁是一部典型的游记，也属佛教地志类著作。",
					"bookcategory": "174",
					"book_name": "佛国记",
					"book_img": "https://img.gushiwen.org/bookPic/foguoji.jpg"
				}]
			},
			.
			.
			.
		]
	},
	.
	.
	.
]
 * @apiVersion 1.0.0
 */
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







// caipu_list.aggregate([{
// 								'$group' : {
// 											  '_id' : '$book_category',
// 											  'sub_category' : {

// 											  					    '$push' : {
// 											  					    	  		'book_section' : '$book_sub_category',
// 											  									'book_items' : '$book_items'
// 											  								}
// 											  					}
// 											}
// 								}]).toArray(function(error, docs){
// 									res.send(docs)
// 									res.end()
// 									db.close()
// 								})