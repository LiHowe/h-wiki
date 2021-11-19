const PresetTheme = ['default', 'forest', 'dark', 'neutral', 'null', 'base']

/**
 * merge the theme settings of mermaid
 * @param mermaidConfig The Mermaid Plugin settings
 */
export function mergeThemeConfig (
  mermaidConfig: Record<string, any>
) {
  const theme = mermaidConfig.theme as string
  if (!theme) return mermaidConfig
  if (!MermaidTheme[theme]) {
    if (!PresetTheme.includes(theme.toLocaleLowerCase())) {
      mermaidConfig.theme = PresetTheme[0]
    }
    return mermaidConfig
  }
  // if has preset themeCSS, merge
  mermaidConfig.theme = PresetTheme[0]
  mermaidConfig.themeCSS = `
  ${MermaidTheme[theme]}
  ${mermaidConfig.themeCSS || ''}
  `
  console.log(mermaidConfig)
  return mermaidConfig
}


export class MermaidTheme {
  static readonly ocean = `
  .node rect, .node polygon { fill: #3b82f633; stroke:#3b82f6; }
  .node div { color: #3b82f6 }
  .edgePath path { fill: #3b82f6 }
  .edgePath .path { stroke: #3b82f6 }
  .edgeLabel { color: #3b82f6 }
  .clusters rect { fill:#ffffde33 }
  .dark .node rect,.dark .node polygon { fill: #00a001; stroke:#3b82f6; }
  `

  static readonly nightfall = `
  `

  static readonly sunrise = `
  `
}
