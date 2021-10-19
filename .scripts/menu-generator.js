/**
 * 主要用于生成各个文件夹内的菜单
 *
 */
const fs = require('fs-extra')
const { resolve, join, basename } = require('path')
const klaw = require('klaw-sync')

const ignoreFiles = [
  '.DS_Store'
]

// 嵌套路由文件夹, 其内部文件夹作为H2进行Markdown生成链接
const nestNavFolder = [
  'CO.程序员'
]

/**
 * 生成嵌套菜单路由README.md
 * @param path
 */
function generateMenu (path) {
  const folders = fs.readdirSync(path)
  // 所有子文件夹
  for (let folderName of folders) {
    // 如果不是需要忽略的文件(夹)
    if (!ignoreFiles.includes(folderName)) {
      genMarkdown(join(path, folderName), nestNavFolder.includes(folderName))
    }
  }
}

/**
 * 生成markdown
 * @param path 路径
 * @param isNest 是否是嵌套路由
 */
function genMarkdown (path, isNest) {
  console.log('generateMarkdown', path, isNest)
  if (isNest) {
    const res = klaw(path, {
      filter: item => !ignoreFiles.includes(basename(item.path)),
      nofile: true
    }).map(({ path }) => ({
      title: basename(path),
      path,
      list: getFolderFiles(path)
    }))
    console.log(res)
  } else {

  }
}

generateMenu(join('content'))

function getFolderFiles (path) {
  return klaw(path, { nodir: true }).map(item => ({
    name: basename(item.path),
    path: item.path
  }))
}

