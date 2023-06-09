// 分类接口

// 创建router 实例
const router = require('express').Router()
// 引入校验工具
// 引入 校验规则
const { imageValidator } = require('../model/iamges')
// 引入 validate 
const validator = require('../middleware/validate')
// 引入控制器 功能模块
const image = require('../controller/upload-images')
// 引入接口鉴权中间件
const auth = require('../middleware/auth')


// 接口设置
// 添加图片
router.post('/', [auth, validator(imageValidator)], image.create)
// 删除单个/批量删除
router.delete('/:imageId', auth, image.remove)

// 导出
module.exports = router