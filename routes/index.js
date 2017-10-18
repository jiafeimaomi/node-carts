//暴漏接口请求
module.exports = function(app){
    require('./register')(app)
    require('./login')(app)
    require('./home')(app)
    require('./addCommondity')(app),
    require('./cart')(app)
}