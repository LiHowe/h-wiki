const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const { program } = require('commander')
const path = require('path')
const prompts = require('prompts')
// const env = require('dotenv').config({ path: '.env.local'})

// const tokenKey = 'YQ_TOKEN'

// --y2g -y is sync to github
// --g2y -g is sync to yuque
// --token -t is yuque token
// const token = isDev ? env[tokenKey] : (argv.token || argv.t)
// const login = argv.login || argv.l
// const repos = argv.repos || argv.r // separate by ,
// const syncToGit = argv.y2g || argv.g
// const syncToYuque = argv.g2y || argv.y

const {
  initRequest,
  getCurrentUser,
  getRepos,
  getDocs,
  getDocDetail,
} = require('./apis')


const tokenPath = path.resolve('./', '.token')

function cacheToken(token) {
  fs.writeFileSync(tokenPath, token)
}

function getToken() {
  let token = ''
  try {
    token = fs.readFileSync(tokenPath, 'utf8')
  } catch(e) {}
  return token
}

const token = getToken()

program
  .command('login')
  .description('login to yuque(by token)')
  .option('-t --token <token>', 'Token', token)
  .action(({ token }) => {
    cacheToken(token)
  })

program
  .command('whoami')
  .description('Show user info')
  .action(async () => {
    const data = await getCurrentUser(token)
    if (!data) {
      console.log(`I don't know`)
    }
    console.log(data)
  })

program
  .command('sync')
  .action(async () => {
    initRequest(token)
    const { login } = await getCurrentUser(token)
    const wsList = await getRepos(login)
    const choices = wsList.map(({ type, namespace, public, name, description }) => {
      return {
        type,
        title: name,
        isPublic: !!public,
        value: namespace,
        description
      }
    })
    console.log(choices)
    const response = await prompts({
      type: 'select',
      name: 'workspace',
      message: 'Choose workspace',
      choices
    })
    console.log(response)
    const docs = await getDocs(response.workspace)
    console.log(docs)
  })



program.parseAsync()

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
