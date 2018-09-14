const path = require('path')
const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const mealsRouter = require('./routes/meal')
const categoryListRouter = require('./routes/category_list')
const caipuListRouter = require('./routes/caipu_list')
const bookscategoryRouter = require('./routes/bookscategory')

app.set('views', path.join(__dirname, 'views')) // 设置存放模板文件的目录
app.set('view engine', 'ejs') // 设置模板引擎 ejs



//静态文件目录，
app.use('/file',express.static(path.join(__dirname,'public')));

app.use('/',indexRouter)
app.use('/users',userRouter)

app.use('/meal',mealsRouter)
app.use('/meal/:meal/page/:page',mealsRouter)
app.use('/meal/:meal/meal_id/:id',mealsRouter)

app.use('/category_list',categoryListRouter)
app.use('/category_list/:category_type',categoryListRouter)

app.use('/caipulist',caipuListRouter)

app.use('/bookscategory',bookscategoryRouter)

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
})
