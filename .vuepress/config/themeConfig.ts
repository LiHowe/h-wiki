const contentPath = '/blog/'
const getPath = (folderName, fileName = 'README.md') => {
  return `${contentPath}${folderName}/${fileName}`
}

const genNav = (folderName) => {

}

export default {
  logo: '/images/logo__dark.png', // Logo图片, 可以使本地图片,也可以是URL
  logoDark: '/images/logo__light.png',
  repo: 'https://github.com/LiHowe/h-wiki', // git仓库地址
  repoLabel: '⭐️ Star', // 仓库链接文字
  editLink: false, // 是否启用 编辑此页 链接。
  // navbar: false,
  // sidebar: false,
  lastUpdatedText: '最后更新时间',
  lastUpdated: false,
  contributors: false,
  docsRepo: 'https://github.com/LiHowe/h-wiki',
  notFound: [
    '[404] 这页儿没啦， 回首页看看去吧',
    '[404] 众里寻他千百度, 你的前方没有路',
    '[404] 你走丢啦'
  ],
  backToHome: '带我回家',
  openInNewWindow: '新窗口打开',
  navbar: [
    {
      text: '算法',
      link: getPath('AL.算法')
    },
    {
      text: '前端',
      // activeMatch: 'FE.前端/*',
      link: getPath('CO.程序员/FE.前端')
    },
    {
      text: '后端',
      // activeMatch: 'BE.后端/*',
      link: getPath('CO.程序员/BE.后端')
    },
    {
      text: '硬件',
      link: getPath('HW.硬件')
    },
    {
      text: '系统',
      link: getPath('OS.系统')
    },
    {
      text: '服务器',
      link: getPath('SE.服务器')
    },
    {
      text: '工具',
      link: getPath('TO.工具')
    },
  ]
}
