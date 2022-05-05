const axios = require('axios')
const argv = require('minimist')(process.argv.slice(2))

const tokenKey = 'YQ_TOKEN'
// --dev 开发环境
const isDev = argv.dev
let env
if (isDev) {
  try {
    env = require('dotenv').config({ path: '.env.local'}).parsed
    console.log(env)
  } catch (e) {
    console.error('请配置 .env.local 文件, YQ_TOKEN字段为语雀token')
  }
}

// --y2g -y is sync to github
// --g2y -g is sync to yuque
// --token -t is yuque token
const token = isDev ? env[tokenKey] : (argv.token || argv.t)
const login = argv.login || argv.l
const repos = argv.repos || argv.r // separate by ,
const syncToGit = argv.y2g || argv.g
const syncToYuque = argv.g2y || argv.y

const {
  request,
  getCurrentUser,
  getRepos,
  getDocs,
  getDocDetail,
} = require('./apis')


console.log(argv, token)

// getDocs('lihowe/wiki').then(res => {
//   console.log(res)
// })

// getCurrentUser(token).then(user => {
//   const { login, id } = user
//   console.log(user)
//   getRepos(login, {}).then(repos=> {
//     console.log(repos)
//   })
// })


/**
 * TODO: 
 * 建立文件索引, 记录同步文档的同步时间
 * 每次查询羽雀文档的时候进行比对
 * 1. 有索引, 羽雀文档项目更新时间大于索引项目同步时间, 则同步
 * 2. 无索引, 则全部同步
 * 3. 有索引, 有新增文档, 则同步新增文档, 并更新索引
 * 
 * [ ] 写到 GitHub 进行每天或者每周自动执行
 * [ ] 写同步脚本, 需要做文档格式转换.
 * [ ] 转移Token 至 github action 或者本地
 */
