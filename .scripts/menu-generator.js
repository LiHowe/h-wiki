/**
 * Note
 * 正则, 我正则表达式写的是真的辣鸡嗷, 有时间要系统的学一学正则表达式了
 * node: 主要用path 与 fs 模块
 */

/**
 * TODO:
 * 格式化各个markdown文件的frontmatter
 * 按照自己项目的配置将frontMatter标准化
 * 没有frontMatter的文件自动添加frontMatter
 * frontMatter解析: https://github.com/jonschlinkert/gray-matter
 */

/**
 * 主要用于生成各个文件夹内的菜单
 */
const fs = require('fs-extra')
const {
  resolve,
  relative,
  extname,
  sep
} = require('path')

// 基础配置
const baseOpts = {
  // 忽略文件
  ignoreFile: false,
  // 忽略文件夹
  ignoreFolder: false,
  // 遍历深度
  depthLimit: Infinity,
  // 过滤文件夹, 支持正则
  exclude: [
    '.DS_Store',
    '.git',
    '.vscode',
    '.idea'
  ],
  // 需要的文件类型
  fileTypes: [],
  // 相对路径
  relativePath: ''
}

// 其实klaw可以做这个事儿, 自己实现了

function traverse (path, opts = {}, ls = []) {
  // 当前路径深度
  opts = Object.assign({}, baseOpts, opts)
  opts.rootDepth = path.split(sep).length + 1
  // 基本配置项
  const {
    ignoreFile = false,
    ignoreFolder = false,
    exclude,
    fileTypes,
    depthLimit = -1,
    rootDepth,
    relativePath
  } = opts

  if (ignoreFile && ignoreFolder) return ls
  // 当前路径下的全部文件
  const names = fs.readdirSync(path)
  for (const fileName of names) {
    // 文件完整路径
    const fp = `${path}${sep}${fileName}`
    // file stat
    const st = fs.statSync(fp)
    const isDir = st.isDirectory()
    const ext = !isDir ? extname(fp) : ''
    // 是否是应该忽略的文件
    const ignoreFlag = !!exclude?.some(reg => new RegExp(reg).test(fp))
      || (!isDir && !fileTypes.includes(ext))
    if (ignoreFlag) continue

    // 当前文件深度
    const depth = fp.split(sep).length
    // 是否是应该收集的文件
    const shouldAdd = isDir ? !ignoreFolder : !ignoreFile

    // 是否应继续遍历
    const continueFlag = isDir && (depth - rootDepth < depthLimit)
    let child = []
    if (continueFlag) child = traverse(fp, opts, child)
    const item = {
      name: fileName,
      path: relative(relativePath, fp),
      type: isDir ? 0 : 1,
      ext,
      child
    }
    shouldAdd && ls.push(item)
  }
  return ls
}
const res = traverse(resolve('../', 'blog'), {
  exclude: [
    '.DS_Store',
    '__附件__',
    'examples',
    'example',
    '.git',
    '.vscode',
    '.idea'
  ],
  fileTypes: [
    '.md'
  ],
  relativePath: resolve('../', 'blog')
})
console.log(JSON.stringify(res, null, 2))
