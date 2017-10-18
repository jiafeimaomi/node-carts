//定义用户表字段
module.exports = {
    name: {type: String, required: true},
    password: {type: String, required: true},
    gender: {type: Boolean, default: true}
}