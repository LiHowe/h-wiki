const PresetTheme = ['default', 'forest', 'dark', 'neutral', 'null', 'base']

export type ThemeColors = string[]

const skyColors: ThemeColors = ['#E3FDFD', '#CBF1F5', '#A6E3E9', '#71C9CE']
const nightfallColors: ThemeColors = ['#F67280', '#C06C84', '#6C5B7B', '#355C7D']

const oceanColors: ThemeColors = ['#03045eff', '#023e8aff', '#0077b6ff', '#0096c7ff', '#00b4d8ff', '#48cae4ff', '#90e0efff', '#ade8f4ff', '#caf0f8ff']

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

function generateStyle (pColor, sColor) {
  const gantt = `

  `
  const flowchart = `
  .node rect, .node polygon { fill: ${sColor}; stroke:${pColor}; }
  .node div { color: ${sColor} }
  `
  return `
  ${flowchart}
  .messageLine0, .messageLine1 { stroke: ${pColor} }
  .edgePath path { fill: ${sColor} }
  .node circle.state-end { fill: ${pColor} }
  .edgePath .path { stroke: ${sColor} }
  .edgeLabel { color: ${sColor} }
  .clusters rect { fill: ${sColor} }
  .actor { fill: ${sColor}; stroke:${pColor}; }
  line, .divider { stroke: ${pColor}; }
  .mermaid svg .task-type-0, .mermaid svg .section-type-0 { fill: ${pColor}!important }
  .mermaid .task-type-1, .mermaid .section-type-1 { fill: ${sColor}!important }
  ${gantt}
  `
}

// TODO: 考虑在setup的时候生成style标签然后插入到文档中
// TODO: 这样的弊端有哪些
export class MermaidTheme {
  static readonly ocean = generateStyle(skyColors[3], skyColors[2])

  static readonly nightfall = `
  `

  static readonly sunrise = `
  `
}

