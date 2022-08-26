const fileService = require('../services/fileService')
const config = require('config')
const fs = require('fs')
const User = require('../models/User')
const File = require('../models/File')
const path = require('path')

class FileController {

  async createDir(req, res) {
    try {
      const {name, type, parent} = req.body
      const file = new File({name, type, parent, user: req.user.id})
      const parentFile = await File.findOne({_id: parent})

      if (!parentFile) {
        file.path = name
        await fileService.createDir(file)
      } else {
        file.path = path.join(parentFile.path, file.name)
        // file.path = `${parentFile.path}/${file.name}`
        await fileService.createDir(file)
        parentFile.childs.push(file._id)
        await parentFile.save()

      }
      await file.save()
      return res.json(file)
    } catch (e) {
      console.log(e)
      return res.status(400).json(e)
    }
  }


  async getFiles(req, res) {
    try {
      const files = await File.find({user: req.user.id, parent: req.query.parent})
      return res.json(files)
      
    } catch (e) {
      console.log(e)
      return res.status(500).json({message: 'Can not get file'})
    }
  }
  async uploadFile(req, res) {
    try {
      const file = req.files.file
      const parent = await File.findOne( {user: req.user.id, _id: req.body.parent} )
      const user = await User.findOne({_id: req.user.id})

      if (user.usedSpace + file.size > user.diskSpace) {
        return res.status(400).json({message: 'There no more space on the disk! '})
      }
      user.usedSpace += file.size


      let filePath, fileShortPath= file.name;

      if (parent) {
        fileShortPath = path.join(parent.path, file.name)
        filePath = path.join(config.get('filePath'), req.user.id, fileShortPath)
      } else {
        filePath = path.join(config.get('filePath'),req.user.id, fileShortPath)
      }
      if (fs.existsSync(filePath)) {
        return res.status(400).json({message: 'File already exist!'})
      }

      file.mv(filePath)

      const type = file.name.split('.').pop()

      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: fileShortPath,
        parent: parent?._id,
        user: user?._id
      })

      await dbFile.save()
      await user.save()
      console.log("All saved")
      console.log("dbFile:::::::: ", dbFile)

      res.json(dbFile)
      // res.status(200).json({message: 'ok'})

    } catch (e) {
      console.log(e)
      return res.status(500).json({message: e})
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.id})
      const pathFile = path.join(config.get('filePath'), req.user.id, file.path,  file.name) 

      if (fs.existsSync(pathFile)) {
        return res.download(pathFile, file.name)
      }
      return res.status(400).json({'message': 'File was not fined'})
    } catch (e) {
      console.log(e)
      return res.status(500).json({'message': 'Download error'})
    }
    
  }
  async deleteFile (req, res) {
    // ищем в базе файл
    // ищем его физически
    // удаляем 
    // возвразаем ответ
    try {
      const file = await File.findOne({_id: req.query.id, user: req.user.id})
      if (!file) {
        return res.status(400).json({message: 'File not found'})
      }

      fileService.deleteFile(file) // физически удаляем файл
      
      
      await file.remove() //удаляем из базы
      return res.json({message: `${file.name} was deleted`})



    } catch (error) {
      console.log(error)
      return res.status(400).json({message: 'Dir is not empty'})
    }
    

  }
}

module.exports = new FileController()