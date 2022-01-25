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
  const arr = []
  files.forEach(filename => {
    if (filename.endsWith('.md')) {
      const { data } = matter.read(path.resolve(folderPath, filename))
      arr.push({
        text: data.title || path.basename(filename, '.md'),
        link: `/${folder}/${filename}`
      })
    }
  })
  res[`/${folder}/`] = arr
  return res
}, {})

console.log(contentObj)

genConfigFile(`
export default ${JSON.stringify(contentObj, null, 2)}
`)
