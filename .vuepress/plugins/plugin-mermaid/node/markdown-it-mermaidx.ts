import { htmlEscape } from '@vuepress/shared'

export default (md: any): void => {
  const originFence = md.renderer.rules.fence.bind(md.renderer.rules)
  md.renderer.rules.fence = (...args: any) => {
    const [tokens, idx] = args
    const { info: languageType, content } = tokens[idx]
    if (content && languageType.trim() === 'mermaid') {
      return `
      <ClientOnly>
        <Mermaid 
        :code="\`${htmlEscape(content.trim())}\`"
        :config="\`${JSON.stringify(md.__mermaidConfig).replace(/\"/g, '\'')}\`"
        />
      </ClientOnly>
      `
    }
    return `${originFence(...args)}`
  }
}
