// 分类数据模块

// y引入 mongoose
const mongoose = require('mongoose')
// 引入joi
const Joi = require('joi')

// 定义分类数据结构
const imagesSchema = new mongoose.Schema({
  // name 设置
  pic_url: {
    type: String,
    required: true
  }
})

// 创建category model 
const Image = mongoose.model('Image', imagesSchema)


// 校验函数

// 校验函数
function imageValidator(data) {
  // 设置数据校验
  const schema = Joi.object({
    // 字符串类型，最少2，最大50，必填
    pic_url: Joi.string().required().messages({
      'any.required': '缺少必选参数 name',
      'string.base': 'name 必须为string'
    })
  })

  return schema.validate(data);
}


// 导出
module.exports = {
  // 导出model
  Image,
  // 导出校验函数
  imageValidator
}