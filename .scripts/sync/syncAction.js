const axios = require('axios')
const argv = require('minimist')(process.argv.slice(2))

// --y2g -y is sync to github
// --g2y -g is sync to yuque
// --token -t is yuque token
const token = argv.token || argv.t
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
