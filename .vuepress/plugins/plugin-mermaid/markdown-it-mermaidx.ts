import { htmlEscape } from '@vuepress/shared'

export default (md): void => {
  const originFence = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const { info: languageType, content } = tokens[idx]
    if (!content) return ''
    if (languageType.trim() === 'mermaid') {
      return `
      <Mermaid>
        <pre>
        ${htmlEscape(content.trim())}
        </pre>
      </Mermaid>
      `
    }
    return `${originFence(...args)}`
  }
}
