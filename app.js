//引入模块
var express = require('express')　//express就是与http对应的第三方核心模块，用于处理http请求
var app = express()　//express模块导出的入口函数

//引入底层中间间
var bodyParser = require('body-parser')　//拦截和解析所有的请求
var multer = require('multer')
var session = require('express-session')

var mongoose = require('mongoose');

//连接mongo，并创建lp数据库
mongoose.connect('mongodb://localhost:27017/lp', { config: { autoIndex: false } });

//引用ejs模板
app.set('view engine', 'html')
app.engine('.html', require('ejs').__express)

//设定试图存放目录
app.set('views', require('path').join(__dirname, 'views'))

//指定本地静态资源访问的路径
app.use(express.static(require('path').join(__dirname, 'public')));

//使用引入的中间件
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//保存cookie信息
app.use(session({
    secret: 'secret', 
    resave: false,
    cookie: {
        maxAge: 1000*60*30
    }
}))


//引入路由文件
require('./routes/index')(app)


//监听8080端口
app.listen(8080);







