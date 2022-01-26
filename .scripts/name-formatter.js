const fs = require('fs-extra')
const path = require('path')
const { paramCase } = require('param-case')

const rootPath = path.resolve(__dirname, '../docs')

const filePath = file => path.resolve(rootPath, file)

const files = fs.readdirSync(rootPath)

files.forEach(filename => {
  fs.renameSync(filePath(filename), filename + '.md')
})
