// 路由接口 入口文件

// 创建router路由实例
const router = require('express').Router()

// 后续设置各个路由功能
// 引入 用户接口
router.use('/user', require('./user'))
// 引入  登录接口
router.use('/auth', require('./auth'))
// 引入 订单接口
router.use('/orders', require('./orders'))
// 引入 图片上传功能
router.use('upload', require('./upload-images'))
// 导出模块
module.exports = router
