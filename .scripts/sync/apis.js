
let request

function initRequest(token) {
  request = axios.create({
    baseURL: 'https://www.yuque.com/api/v2',
    timeout: 5 * 1_000,
    headers: {
      'User-Agent': 'SyncToBlog',
      'X-Auth-Token': token,
    }
  })

  request.interceptors.request.use(config => {
    if (config.method === 'post') {
      config.request.headers['Content-Type'] = 'application/json'
    }
    return config
  })
  
  request.interceptors.response.use(res => {
    if (res.status === 200) {
      return res.data.data
    }
  })
}

/**
 * 根据token获取当前用户
 * @param {string} token
 */
function getCurrentUser(token) {
  initRequest(token)
  return request.get('/user')
}

// https://www.yuque.com/yuque/developer/repo
/**
 * 获取知识库列表
 * type: 知识库类型: Book, Design, All
 * offset: 用于分页
 * @param {{ type?: string, offset?: number }} params 
 */ 
function getRepos(userName, params) {
  return request.get(`/users/${userName}/repos`, {
    params
  })
}

/**
 * 获取知识库文档列表
 * @param {String | Number} namespaceOrId 
 * @returns 
 */
function getDocs(namespaceOrId) {
  return request.get(`/repos/${namespaceOrId}/docs`)
}

/**
 * 获取文档详情
 * @param {String} namespace 
 * @param {String} slug 
 * @param {Number} raw 是否返回原始文档格式
 * @returns 
 */
function getDocDetail(namespace, slug, raw = 0) {
  return request.get(`/repos/${namespace}/docs/${slug}`, {
    params: { raw }
  })
}

/**
 * TODO: 创建知识库, 暂时没用上, 之后补充
 * @param {*} data 
 */
function createRepo(data) {}


module.exports = {
  request,
  getCurrentUser,
  getRepos,
  getDocs,
  getDocDetail,
}
