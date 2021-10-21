const contentPath = '/blog/'
const getPath = (folderName) => {
  return `${contentPath}${folderName}/README.md`
}

const genNav = (folderName) => {

}

export default {
  logo: '/images/icon.png', // Logo图片, 可以使本地图片,也可以是URL
  repo: 'https://github.com/LiHowe/h-wiki', // git仓库地址
  repoLabel: 'Howe\'s Wiki', // 仓库链接文字
  editLink: false, // 是否启用 编辑此页 链接。
  // navbar: false,
  // sidebar: false,
  lastUpdatedText: '最后更新时间',
  contributors: false,
  navbar: [
    {
      text: '算法',
      link: getPath('AL.算法')
    },
    {
      text: '程序员',
      activeMatch: '/CO.程序员/',
      children: [
        {
          text: '前端',
          activeMatch: '/CO.程序员/FE.前端/*',
          link: getPath('CO.程序员/FE.前端')
        }
      ]
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
