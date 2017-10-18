
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommondityModel = require('../common/CommondityModel')
// console.log('CommondityModel', CommondityModel)

//定义一个Schema,定义了集合的字段
var CommonditySchema = new Schema(CommondityModel);
//将Schema转化为model
var Commondity = mongoose.model('Commondity', CommonditySchema);


module.exports = function(app){
    app.get('/home',function(req, res){
        // console.log('get请求--home')
        // res.render('register')
        // console.log('req.session', req.session)
        if(req.session.user){
            Commondity.find({}, function(error, docs){
                // console.log('docs--', docs)
                res.send({
                    code: 200,
                    Commonditys: docs,
                    uId: req.session.user._id
                })
            })
        }else{
            req.session.error = "请先登录"
            res.redirect('/login')
        }
        
    })

}

