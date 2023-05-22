// 引入 config文件中的 index 配置文件
const config = require('./config/index')
// console.log(config)

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

// 创建 express 实例对象 
const app = express()

// 引入中间键
app.use(express.json())

// 引入cors 中间件
app.use(cors())

// 引入 morgan 中间件
// app.use(morgan())
app.use(morgan('dev'))

// 引入数据库,模块
require('./model')

// 引入路由中间件
app.use('/api', require('./routes'))

// 引入错误处理中间件
app.use(require('./middleware/error'))


// 监听端口 
app.listen(config.app.port, () => {
  console.log(`running at http://43.143.179.237:${config.app.port}`)
})