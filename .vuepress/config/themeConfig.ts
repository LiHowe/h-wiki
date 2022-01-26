import sidebar from './sidebarConfig'
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
    '[404] 这页儿没啦, 回首页看看去吧.',
    '[404] 众里寻他千百度, 你的前方没有路.',
    '[404] 你走丢啦.'
  ],
  backToHome: '带我回家',
  openInNewWindow: '新窗口打开',
  navbar: [
    {
      text: 'Wiki',
      link: '/docs/README.md'
    },
    {
      text: 'Examples',
      link: '/examples/README.md'
    },
    {
      text: 'Interview',
      link: '/interview/README.md'
    }
  ],
  sidebar
}
