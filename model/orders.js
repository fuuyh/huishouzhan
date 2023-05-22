// 分类数据模块

// y引入 mongoose
const mongoose = require('mongoose')
// 引入joi
const Joi = require('joi')

// 定义分类数据结构
const ordersSchema = new mongoose.Schema({
  // name 设置
  user_name: {
    type: String,
    required: true,
    maxLength: 20
  },
  // 用户手机号
  user_phone: {
    type: Number,
    required: true
  },
  // 地址
  user_address: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50
  },
  // 回收品类
  recyle_class: {
    type: String
  },
  // 要求 上门时间
  expected_time: {
    type: String
  },
  // 时间段
  time_period: {
    type: String
  },
  // 是否完成订单
  is_done: {
    type: Boolean
  }
})

// 创建category model 
const Order = mongoose.model('Order', ordersSchema)


// 校验函数

// 校验函数
function orderValidator(data) {
  // 设置数据校验
  const schema = Joi.object({
    // 字符串类型，最少2，最大50，必填
    user_name: Joi.string().max(20).required().messages({
      'any.required': '缺少必选参数 name',
      'string.base': 'name 必须为string',
      'string.max': 'name 最多20个字符'
    }),
    // 用户手机号
    user_phone: Joi.number().required().messages({
      'any.required': '缺少必选参数 user_phone',
      'number.base': '手机号 必须为number'
    }),
    // 用户地址
    user_address: Joi.string().min(5).max(50).required().messages({
      'any.required': '缺少必选参数 user_address',
      'string.base': '用户地址 必须为string',
      'string.max': '用户地址 最长50个字符',
      'string.min': '用户地址 最少5个字符'
    }),
    // recyle_class垃圾分类
    recyle_class: Joi.string().messages({
      'string.base': '用户地址 必须为string'
    }),
    // expected_time时间
    expected_time: Joi.string().messages({
      'string.base': '时间 必须为string'
    }),
    // time_period时间
    time_period: Joi.string().messages({
      'string.base': '时间 必须为string'
    }),
    // isdone是否完成
    is_done: Joi.boolean().falsy('N').messages({
      'boolean.base': '是否完成 必须为boolean'
    })
  });

  return schema.validate(data);
}


// 导出
module.exports = {
  // 导出model
  Order,
  // 导出校验函数
  orderValidator
}