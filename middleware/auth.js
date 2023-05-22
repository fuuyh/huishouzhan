// 接口鉴权中间件

// 引入 jwt 和配置文件
const jwt = require('jsonwebtoken')
const config = require('../config')
const { User } = require('../model/user')

// 导出
module.exports = async function (req, res, next) {
  // 接口鉴权，（约定，前端请求头中需要包含有效的 authorization 字段，值为 access_token）
  // 1. 获取旧令牌
  const oldToken = req.header('authorization')

  // 2. 检查是否存在旧令牌
  if (!oldToken) {
    return res.status(401).json({
      code: 401,
      msg: '无token信息'
    })
  }

  try {
    // 3. 验证旧令牌并获取用户信息
    const userData = jwt.verify(oldToken, config.jwtPrivateKey)
    const userId = userData._id

    // 4. 检查用户是否存在
    const user = await User.findById(userId)
    if (!user) {
      return res.status(401).json({
        code: 401,
        msg: '用户不存在'
      })
    }

    // 5. 生成新令牌
    const newToken = user.generateToken()

    // 6. 将新令牌添加到响应头中
    res.header('authorization', newToken)

    // 7. 传递用户信息给下一个中间件或路由处理函数
    req.userData = userData

    // 8. 调用next()，让程序继续执行
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({
        code: 401,
        msg: 'token已过期'
      })
    }
    // 其他验证错误
    return res.status(401).json({
      code: 401,
      msg: '令牌无效'
    })
  }
}
