//定义购物车表字段
module.exports = {
    uId: {type: String, required: true}, //用户id
    cId: {type: String, required: true},　//商品id
    cName: {type: String},
    cPrice: {type: Number},
    cNum: {type: Number},
    cStatus:{type: Boolean, default: false}
}