const express = require('express')
const router = express.Router()

router.get('/',function(req, res){
	console.log(__dirname)
	res.setHeader('Content-Type', 'text/html');
	res.sendFile('${__dirname}/source.htm')
})


module.exports = router