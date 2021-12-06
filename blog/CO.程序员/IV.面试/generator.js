/**
 * TODO:
 * 将当前文件夹下的markdown文件转换为一个个问题组件, 并提供整合为一个文件的参数选项
 * 为了提供面试题随机测试功能
 */

const fs = require('fs-extra')
const path = require('path')
const marked = require('marked')

// const root = __dirname
// const files = fs.readdirSync(root)

// for (const file of files) {
//   const pt = root + path.sep + file
//   const stat = fs.statSync(pt)
//   if (stat.isFile() && path.extname(file) === '.md') {
//     compiler(pt)
//   }
// }

const content = tokenlizer(path.resolve(__dirname, './vue.md'))
marked.use({ 
  tokenizer: {
    tag(src) {
      const match = src.match(/\%+([^\%\n]+?)\%+/)
      if (match) {
        console.log('use tokenlizer', src)
        return {
          type: 'i',
          raw: match[0],
          text: match[1].trim()
        }
      }
      return false
    }
  }
})
const parsed = marked.lexer(content)
console.log(parsed)


// 获取文本内容
function getContent (filePath) {
  return fs.readFileSync(filePath, 'utf-8')
}

// 分词
function tokenlizer (filePath) {
  const content = getContent(filePath)
  return content
}

function parser (tokens) {

}

// 转换问题
function parseQuestion (content) {
  let cursor = 0
  let end = content.length

}

/**
 * 解析Tag标签
 * %`taga`|`tagb`%
 * @param {string} content 
 */
function parseTags (content) {

}

/**
 * 解析答案
 * @param {string} content 
 */
function parseAnswer (content) {

}

function codeGenerator (ast) {

}

function transformer (ast) {

}

function compiler (path) {
  const tokens = tokenlizer(path)
  const ast = parser(tokens)
  const elAst = transformer(ast)
  return codeGenerator(elAst)
}
