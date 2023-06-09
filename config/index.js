// 内容导出
module.exports = {
  // 项目配置
  app: {
    // 默认是3000端口 
    // 判断如果没有process.env.PORT  就是 默认3000
    port: process.env.PORT || 3005
  },
  // 数据库设置 
  db: {
    url: process.env.MONGODB_URL ||'mongodb://root:root@43.143.179.237:27017/admin'
  },
  // 设置jwt使用密钥
  jwtPrivateKey: 'e3075c98-7d67-4a01-be14-f268fbadf321'
}