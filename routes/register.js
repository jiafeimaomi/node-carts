
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserModel = require('../common/UserModel')
// console.log('UserModel', UserModel)

//定义一个Schema,定义了集合的字段
var UserSchema = new Schema(UserModel);
//将Schema转化为model
var User = mongoose.model('User', UserSchema);


module.exports = function(app){
    app.get('/register',function(req, res){
        console.log('get请求')
        res.render('register')
    })


    app.post('/register',function(req, res){
        var username = req.body.username
        console.log('username--', username);
        User.findOne({name: username}, function(error, doc){
            if( doc && doc._id){
                req.session.error = '用户名已经存在'
                // console.log('用户名已经存在')
                res.send(500)
            }else{
                var password = req.body.password
                User.create({
                    name: username,
                    password: password
                }, function(err, doc){
                    if(err){
                        res.send(500)
                    }else{
                        req.session.error = '用户名创建成功'
                        // console.log('用户名创建成功')
                        res.send(200)
                    }
                })
            }
        })
    })
}

