const express = require('express')
const router = express.Router()
const mongoClient = require('mongodb').MongoClient
const dbURL = 'mongodb://localhost:27017'


function responseAction(query,req, res, pagenum,limitnum) {
	mongoClient.connect(dbURL, {useNewUrlParser:true},function(error, db){
		const books = db.db('books')
		const sentences = books.collection('sentences')

		sentences.find(query).skip(pagenum * limitnum).limit(limitnum).toArray(function (error, docs){
			res.send(docs)
			res.end()
			db.close()
		})
	})
}

/**
 * @api {get} /sentences/:page 名句列表
 * @apiSampleRequest http://localhost:3000/sentences/:page
 * @apiDescription 名句列表
 * @apiName 名句列表
 * @apiGroup Sentences
 * @apiParam {Int} page 页数
 * @apiSuccessExample {json} Success-Response:
 *  [
 *     {
 *         "_id": "5b9b5662aaa98b145c758e3e",
 *         "sentence_content": "相逢成夜宿，陇月向人圆。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "8bc92f5d37cd",
 *         "sentence_poem_title": "《宿赞公房》",
 *         "sentence_poem_author": "杜甫",
 *         "sentence_poem_id": "b6817de4aa36"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e3f",
 *         "sentence_content": "江上几人在，天涯孤棹还。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "a2f8cc3e6fd8",
 *         "sentence_poem_title": "《送人东游》",
 *         "sentence_poem_author": "温庭筠",
 *         "sentence_poem_id": "57cf93080fe5"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e46",
 *         "sentence_content": "塞垣多少思归客，留着长条赠远游。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "eb49644839f6",
 *         "sentence_poem_title": "《官桥柳色》",
 *         "sentence_poem_author": "朱栴",
 *         "sentence_poem_id": "49cb4a5c9717"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e47",
 *         "sentence_content": "故人何不返，春华复应晚。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "59299e4b84f9",
 *         "sentence_poem_title": "《江南曲》",
 *         "sentence_poem_author": "柳恽",
 *         "sentence_poem_id": "2f826f0d0fe3"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e49",
 *         "sentence_content": "东风兮东风，为我吹行云使西来。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "9182f8830d29",
 *         "sentence_poem_title": "《久别离》",
 *         "sentence_poem_author": "李白",
 *         "sentence_poem_id": "dc21dcbbe53a"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e5a",
 *         "sentence_content": "老至居人下，春归在客先。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "6b802e96f321",
 *         "sentence_poem_title": "《新年作》",
 *         "sentence_poem_author": "刘长卿",
 *         "sentence_poem_id": "0938dbd3a92b"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e5f",
 *         "sentence_content": "满地残红宫锦污，昨夜南园风雨。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "905ba81a9ca8",
 *         "sentence_poem_title": "《清平乐·春晚》",
 *         "sentence_poem_author": "王安国",
 *         "sentence_poem_id": "7d80baaa45ee"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e63",
 *         "sentence_content": "况复烦促倦，激烈思时康。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "2b8def513467",
 *         "sentence_poem_title": "《夏夜叹》",
 *         "sentence_poem_author": "杜甫",
 *         "sentence_poem_id": "65f2230b824d"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e68",
 *         "sentence_content": "无情明月，有情归梦，同到幽闺。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "41099ba881d6",
 *         "sentence_poem_title": "《眼儿媚·秋思》",
 *         "sentence_poem_author": "刘基",
 *         "sentence_poem_id": "4c8648421baa"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e6b",
 *         "sentence_content": "无一语，对芳尊。安排肠断到黄昏。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "f047af712ad6",
 *         "sentence_poem_title": "《鹧鸪天·枝上流莺和泪闻》",
 *         "sentence_poem_author": "秦观",
 *         "sentence_poem_id": "92dc301aa73f"
 *     }
 * ]
 * @apiVersion 1.0.0
 */
router.get('/:page',function(req, res){
	var query = {}
	responseAction(query, req,res, parseInt(req.params.page),10)
})



/**
 * @api {get} /sentences/identifier/:sentence_id/type/:sentence_type 以id以及类型查询名句
 * @apiSampleRequest http://localhost:3000/sentences/identifier/:sentence_id/type/:sentence_type
 * @apiDescription 以id以及类型查询名句
 * @apiName 以id以及类型查询名句
 * @apiGroup Sentences
 * @apiParam {String} sentence_id 名句id
 * @apiParam {String} sentence_type 名句类型
 * @apiSuccessExample {json} Success-Response:
 * [
 *     {
 *         "_id": "5b9b5662aaa98b145c758e3e",
 *         "sentence_content": "相逢成夜宿，陇月向人圆。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "8bc92f5d37cd",
 *         "sentence_poem_title": "《宿赞公房》",
 *         "sentence_poem_author": "杜甫",
 *         "sentence_poem_id": "b6817de4aa36"
 *     }
 * ]
 * @apiVersion 1.0.0
 */
router.get('/identifier/:sentence_id/type/:sentence_type',function(req, res){
	
		var query = {
			'sentence_id' : req.params.sentence_id,
			'sentence_type' : req.params.sentence_type
		}
		responseAction(query,req, res,0, 0)
})


/**
 * @api {get} /sentences/identifier/:sentence_id 以id查询名句
 * @apiSampleRequest http://localhost:3000/sentences/identifier/:sentence_id
 * @apiDescription 以id查询名句
 * @apiName 以id查询名句
 * @apiGroup Sentences
 * @apiParam {String} sentence_id 名句id
 * @apiSuccessExample {json} Success-Response:
 * [
 *     {
 *         "_id": "5b9b5662aaa98b145c758e3e",
 *         "sentence_content": "相逢成夜宿，陇月向人圆。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "8bc92f5d37cd",
 *         "sentence_poem_title": "《宿赞公房》",
 *         "sentence_poem_author": "杜甫",
 *         "sentence_poem_id": "b6817de4aa36"
 *     },
 *     {
 *         "_id": "5b9b5663aaa98b145c75953d",
 *         "sentence_content": "相逢成夜宿，陇月向人圆。",
 *         "sentence_type": "天气",
 *         "sentence_id": "8bc92f5d37cd",
 *         "sentence_poem_title": "《宿赞公房》",
 *         "sentence_poem_author": "杜甫",
 *         "sentence_poem_id": "b6817de4aa36"
 *     }
 * ]
 * @apiVersion 1.0.0
 */
router.get('/identifier/:sentence_id',function(req, res){
	
		var query = {
			'sentence_id' : req.params.sentence_id
		}
		console.log(req.params.sentence_id)
		responseAction(query,req, res,0,0)
})


/**
 * @api {get} /sentences/type/:sentence_type/:page 以类型查询名句
 * @apiSampleRequest http://localhost:3000/sentences/type/:sentence_type/:page
 * @apiDescription 以类型查询名句
 * @apiName 以类型查询名句
 * @apiGroup Sentences
 * @apiParam {String} sentence_type 名句类型
 * @apiParam {Int} page 页数
 * @apiSuccessExample {json} Success-Response:
 * [
 *     {
 *         "_id": "5b9b5662aaa98b145c758e3e",
 *         "sentence_content": "相逢成夜宿，陇月向人圆。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "8bc92f5d37cd",
 *         "sentence_poem_title": "《宿赞公房》",
 *         "sentence_poem_author": "杜甫",
 *         "sentence_poem_id": "b6817de4aa36"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e3f",
 *         "sentence_content": "江上几人在，天涯孤棹还。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "a2f8cc3e6fd8",
 *         "sentence_poem_title": "《送人东游》",
 *         "sentence_poem_author": "温庭筠",
 *         "sentence_poem_id": "57cf93080fe5"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e46",
 *         "sentence_content": "塞垣多少思归客，留着长条赠远游。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "eb49644839f6",
 *         "sentence_poem_title": "《官桥柳色》",
 *         "sentence_poem_author": "朱栴",
 *         "sentence_poem_id": "49cb4a5c9717"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e47",
 *         "sentence_content": "故人何不返，春华复应晚。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "59299e4b84f9",
 *         "sentence_poem_title": "《江南曲》",
 *         "sentence_poem_author": "柳恽",
 *         "sentence_poem_id": "2f826f0d0fe3"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e49",
 *         "sentence_content": "东风兮东风，为我吹行云使西来。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "9182f8830d29",
 *         "sentence_poem_title": "《久别离》",
 *         "sentence_poem_author": "李白",
 *         "sentence_poem_id": "dc21dcbbe53a"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e5a",
 *         "sentence_content": "老至居人下，春归在客先。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "6b802e96f321",
 *         "sentence_poem_title": "《新年作》",
 *         "sentence_poem_author": "刘长卿",
 *         "sentence_poem_id": "0938dbd3a92b"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e5f",
 *         "sentence_content": "满地残红宫锦污，昨夜南园风雨。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "905ba81a9ca8",
 *         "sentence_poem_title": "《清平乐·春晚》",
 *         "sentence_poem_author": "王安国",
 *         "sentence_poem_id": "7d80baaa45ee"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e63",
 *         "sentence_content": "况复烦促倦，激烈思时康。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "2b8def513467",
 *         "sentence_poem_title": "《夏夜叹》",
 *         "sentence_poem_author": "杜甫",
 *         "sentence_poem_id": "65f2230b824d"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e68",
 *         "sentence_content": "无情明月，有情归梦，同到幽闺。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "41099ba881d6",
 *         "sentence_poem_title": "《眼儿媚·秋思》",
 *         "sentence_poem_author": "刘基",
 *         "sentence_poem_id": "4c8648421baa"
 *     },
 *     {
 *         "_id": "5b9b5662aaa98b145c758e6b",
 *         "sentence_content": "无一语，对芳尊。安排肠断到黄昏。",
 *         "sentence_type": "抒情",
 *         "sentence_id": "f047af712ad6",
 *         "sentence_poem_title": "《鹧鸪天·枝上流莺和泪闻》",
 *         "sentence_poem_author": "秦观",
 *         "sentence_poem_id": "92dc301aa73f"
 *     }
 * ]
 * @apiVersion 1.0.0
 */
router.get('/type/:sentence_type/:page',function(req, res){
	
		var query = {
			'sentence_type' : req.params.sentence_type
		}
		responseAction(query,req, res, parseInt(req.params.page),10)
})




module.exports = router

