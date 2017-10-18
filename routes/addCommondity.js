var mongoose = require('mongoose');

//将Schema转化为model
var Commondity = mongoose.model('Commondity');


module.exports = function(app){
    app.get('/home',function(req, res){
        console.log('get请求--add')
        
    })


    app.post('/addCommondity',function(req, res){
        console.log('req.body---', req.body)
        var commondityName = req.body.commondityName
        var commondityPrice = req.body.commondityPrice
        // var commondityNum = req.body.commondityNum
        if(req.session.user){
            Commondity.create({
                name: commondityName,
                price: commondityPrice
                // num: commondityNum
            }, function(error, doc){
                console.log('error--', error)
                console.log('doc--', doc)
                if(doc && doc._id){
                    console.log('商品添加成功！')
                    res.send({
                        code: 200,
                        msg: "商品添加成功！"
                    })
                }
            })
        }else{
            req.session.error = "请先登录"
            res.redirect('/login')
        }
    })
}

