const path = require('path')
const fs = require('fs-extra')
const matter = require('gray-matter')
const folders = [
  'docs',
  // 'interview',
  // 'examples'
]

function genConfigFile (content) {
  fs.writeFileSync(
    path.resolve(__dirname, '../.vuepress/config/sidebarConfig.ts'),
    content
  )
}

const contentObj = folders.reduce((res, folder) => {
  const folderPath = path.resolve(__dirname, `../${folder}`)
  const files = fs.readdirSync(folderPath)
  // 先放普通文章, 最后放系列文章
  const arr = []
  const series = {}
  files.forEach(filename => {
    if (filename.endsWith('.md')) {
      const { data } = matter.read(path.resolve(folderPath, filename))
      const nav = {
        text: data.title || path.basename(filename, '.md'),
        link: `/${folder}/${filename}`
      }
      if (data.series) {
        if (series[data.series]) {
          series[data.series].push(nav)
        } else {
          series[data.series] = [nav]
        }
      } else {
        arr.push(nav)
      }
    }
  })
  arr.push(...Object.keys(series).map(s => {
    return {
      text: s,
      collapsible: true,
      children: series[s]
    }
  }))
  res[`/${folder}/`] = arr
  return res
}, {})

console.log(contentObj)

genConfigFile(`
export default ${JSON.stringify(contentObj, null, 2)}
`)
