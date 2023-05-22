//  文章设置 功能模块

// 引入article model 
const { Order } = require('../model/orders')
// 获取全部
exports.getAll = async (req, res, next) => {
  try {
    // 获取所有订单
    // 1,判断是否传递筛选参数,例如分类筛选或草稿状态
    let data
    const { is_done } = req.query
    // 判断 如果两个参数有一个的话 就按照参数筛选查询
    if ( is_done ) {
      //  查询数据库
      data = await Order.find(req.query)
    } else {
      // 如果没有参数，就查询全部订单
      data = await Order.find()
    }
    // 2,返回响应
    res.status(200).json({
      code: 200,
      msg: '查询订单成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
// 添加新的
exports.create = async (req, res, next) => {
  try {
    // 1，创建并存储数据
    const data = new Order(Object.assign(req.body))
    await data.save()
    // 2，成功后返回响应
    res.status(200).json({
      code: 200,
      msg: '订单创建成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
// 获取单个
exports.get = async (req, res, next) => {
  try {
    // 1,根据id获取数据
    const id = req.params.oid
    // console.log(id)
    // 2,查找数据库
    // 通过populate()方法链表查询关联 category和author
    const data = await Order.findById(id)
    console.log(data)
    // 2,检测是否存在数据
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '获取订单失败',
        value: {
          id
        }
      })
    }
    // 获取成功
    res.status(200).json({
      code: 200,
      msg: '获取订单成功',
      data
    })
    
  } catch (err) {
    next(err)
  }
}

// 编辑单个
exports.update = async (req, res, next) => {
  try {
    // 1， 修改数据
    const data = await Order.findByIdAndUpdate(req.params.oid, req.body, { new: true })
    // 2,检测并响应
    if (!data) {
      return res.status(400).json({
        code: 400,
        msg: '订单修改失败',
        value: Object.assign(req.body, {
          _id: req.params.aid
        })
      })
    }
    res.status(200).json({
      code: 200,
      msg: '订单修改成功',
      data
    })
  } catch (err) {
    next(err)
  }
}
// 删除
exports.remove = async (req, res, next) => {
  try {
    const { orderIds } = req.body;
    if (orderIds) {
      // 使用 deleteMany 方法删除指定的订单列表
      const result = await Order.deleteMany({ _id: { $in: orderIds } })
      // 判断是否有订单被删除
      if (result.deletedCount === 0) {
        return res.status(400).json({
          code: 400,
          msg: '批量删除失败',
          value: {
            orderIds
          }
        })
      }
      // 返回成功删除的响应
      res.status(200).json({
        code: 200,
        msg: '批量删除成功',
        deletedCount: result.deletedCount
      })
    } else {
      // 1， 根据id查找要删除的信息
      const id = req.params.oid
      const data = await Order.findByIdAndDelete(id)
      // 2，判断是否成功 返回响应
      if (!data) {
        return res.status(400).json({
          code: 400,
          msg: '删除失败',
          value: {
            id
          }
        })
      }
      // 3,成功响应
      res.status(200).json({
        code: 200,
        msg: '删除成功',
        data
      })
    }

  } catch (err) {
    next(err)
  }
}