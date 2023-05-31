//  文章设置 功能模块
const fs = require('fs')
const path = require('path')
// 引入article model 
const { Image } = require('../model/images')

// 添加新的图片，将url保存到数据库中，需要添加一个banners数据表，字段：title，url
exports.create = async (req, res, next) => {

  try {
    const imageFile = req.file
    const uploadPath = '/usr/local/upload/directory/'
    // 生成唯一的文件名或路径
    const fileName = Date.now() + path.extname(imageFile.originalname)

    
    // 将文件从临时路径移动到目标目录中
    fs.renameSync(imageFile.path, path.join(uploadPath, fileName))

    // 构建图片 URL
    const imageUrl = `${uploadPath}${fileName}`;
    // 1，创建并存储数据
    const data = new Image({pic_url: imageUrl})
    await data.save()
    // 2，成功后返回响应
    res.status(200).json({
      code: 200,
      msg: '图片上传成功',
      data
    })
  } catch (err) {
    next(err)
  }
}

// 删除
exports.remove = async (req, res, next) => {
  try {
    // 调用删除图片的函数
    const imageId = req.imageId
    // 从数据库中查询图片记录
    const image = await Image.findById(imageId)
    if (!image) {
      return res.status(404).json({
        code: 404,
        msg: '未找到对应的图片记录',
        data: imageId
      })
    }
    // 删除服务器上的图片文件
    const imagePath = path.join('/usr/local/upload/directory/', image.pic_url)
    fs.unlink(imagePath, (err) => {
      if (err) {
        return res.status(400).json({
          code: 400,
          msg: '删除图片文件失败',
          data: err
        })
      }
      // 删除成功
      res.status(200).json({
        code: 200,
        msg: '删除图片文件成功'
    })
  })

    // 从数据库中删除图片记录
    await Image.findByIdAndDelete(imageId)
    res.status(200).json({
      code: 200,
      msg: '删除图片文件成功'
    })
  } catch (err) {
    next(err)
  }
}
