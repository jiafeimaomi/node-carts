
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CartModel = require('../common/CartModel')
// console.log('CartModel', CartModel)

//定义一个Schema,定义了集合的字段
var CartSchema = new Schema(CartModel);
//将Schema转化为model
var Cart = mongoose.model('Cart', CartSchema);


module.exports = function(app){
    app.get('/cart',function(req, res){
        // console.log('get请求--cart')
        // res.render('register')
        if(req.session.user){
            Cart.find({}, function(error, docs){
                if(docs){
                    res.send({
                        code: 200,
                        carts: docs
                    })
                }
            })
        }
    })


    app.post('/addToCart/:id',function(req, res){
        // console.log('post请求--cart')
        // console.log('req.body---', req.body)
        var uId = req.body.uId,
            cId = req.body.cId,
            cName = req.body.cName,
            cPrice = req.body.cPrice,
            cNum = req.body.cNum
        if(req.session.user){
            // console.log('用户已登录')
            Cart.find({"uId": uId, "cId": cId}, function(error, doc){
                if(doc && doc.length){
                    //此商品已经存在
                    var curNum = parseInt(doc[0].cNum)
                    Cart.update({"uId":uId, "_id": doc[0]._id}, {$set: {"cNum": curNum+1}},function(err, doc){
                        if(doc){
                            res.send({
                                code: 200,
                                msg: '加入购物车成功！'
                            })
                        }
                    })
                }else{
                    //此商品不存在
                    Cart.create({
                        uId: uId,
                        cId: cId,
                        cName: cName,
                        cNum:cNum,
                        cPrice: cPrice
                    }, function(error, doc){
                        if(doc && doc._id){
                            res.send({
                                code: 200,
                                msg: '加入购物车成功！'
                            })
                        }
                    })

                }
            })
        }

    })

    app.post('/delete',function(req, res){
        // console.log('req.body--00', req.body)
        var ids = req.body.ids
        if(req.session.user){
            if(ids && ids.length){
                ids.map((item, key)=>{
                    console.log('item--', item, key)
                    Cart.remove({'_id': item},function(error, doc){
                        console.log('doc--', doc)
                        if(doc && doc.result.ok == 1){
                            res.send({
                                code: 200,
                                msg: '删除成功'
                            })
                        }

                    })
                })
            }
        }

    })


    app.post('/settle',function(req, res){
        // console.log('req.body--settle', req.body)
        var ids = req.body.ids
        if(req.session.user){
            if(ids && ids.length){
                ids.map((item, key)=>{
                    console.log('item--', item, key)
                    Cart.update({'_id': item.id},{$set:{'cNum': item.num, 'cStatus': true}},function(error, doc){
                        console.log('doc--', doc)
                        if(doc && doc.nModified == 1){
                            res.send({
                                code: 200,
                                msg: '删除成功'
                            })
                        }

                    })
                })
            }
        }

    })
}

