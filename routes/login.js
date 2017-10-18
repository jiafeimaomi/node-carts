
var mongoose = require('mongoose');
var User = mongoose.model('User');


module.exports = function(app){
    app.get('/login',function(req, res){
        res.render('login')
    })


    app.post('/login',function(req, res){
        var username = req.body.username,
            password = req.body.password
        User.findOne({name: username}, function(error, doc){
            if( doc && !error){
                if(doc.name == username && doc.password == password){
                    console.log('登录成功')
                    req.session.user=doc
                    res.send(200)
                }else{
                    res.send(500)
                    console.log('密码错误')
                    req.session.error = '密码错误！';
                }
            }else{
                console.log('用户名不存在')
                req.session.error = '用户名不存在！';
                res.send(404)
            }
        })
    })
}
