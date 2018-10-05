const path = require('path')
const express = require('express')
const app = express()
const fs = require('fs')
const http = require('http')
const https = require('https')
const privateKey = fs.readFileSync('./public/crtfiles/2_houcong.win.key')
const certficate = fs.readFileSync('./public/crtfiles/1_houcong.win_bundle.crt')
const credentials = {'key': privateKey, 'cert': certficate}

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const mealsRouter = require('./routes/meal')
const categoryListRouter = require('./routes/category_list')
const caipuListRouter = require('./routes/caipu_list')
const bookscategoryRouter = require('./routes/bookscategory')
const poemsRouter = require('./routes/poems')
const poetsRouter = require('./routes/poets')
const sentencesRouter = require('./routes/sentences')
const booksRouter = require('./routes/books')

app.set('views', path.join(__dirname, 'views')) // 设置存放模板文件的目录
app.set('view engine', 'ejs') // 设置模板引擎 ejs



//静态文件目录，
app.use('/file',express.static(path.join(__dirname,'public')));

// 菜谱
app.use('/',indexRouter)
app.use('/users',userRouter)

app.use('/meal',mealsRouter)
app.use('/meal/:meal/page/:page',mealsRouter)
app.use('/meal/:meal/meal_id/:id',mealsRouter)

app.use('/category_list',categoryListRouter)
app.use('/category_list/:category_type',categoryListRouter)

app.use('/caipulist',caipuListRouter)

// 古诗词
app.use('/bookscategory',bookscategoryRouter)
app.use('/poems',poemsRouter)
app.use('/poets',poetsRouter)
app.use('/books',booksRouter)
app.use('/sentences',sentencesRouter)


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);
var PORT = 18080;
var SSLPORT = 18081;

httpServer.listen(PORT, function() {
    console.log('HTTP Server is running on: http://localhost:%s', PORT);
});
httpsServer.listen(SSLPORT, function() {
    console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
