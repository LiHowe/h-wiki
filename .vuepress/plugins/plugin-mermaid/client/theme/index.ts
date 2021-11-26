
export type PresetThemeName = 'default' | 'forest' | 'dark' | 'neutral' | 'null' | 'base'
export type ExtraThemeName = 'ocean' | 'sky' | 'sunrise' | 'nightfall'
export type MermaidThemeName = PresetThemeName | ExtraThemeName

export type MermaidThemeConfig = 
Partial<
  ThemeMainVars &
  ThemeFlowchartVars &
  ThemeGanttVars &
  ThemeSequenceVars &
  ThemeJourneyVars &
  ThemeRequirementVars &
  ThemeClassVars &
  ThemeStateVars &
  ThemePieVars & 
  {
    theme?: MermaidThemeName
  }
>

const PresetThemes: PresetThemeName[] = ['default', 'forest', 'dark', 'neutral', 'null', 'base']
const ExtraThemeNames: ExtraThemeName[] = ['ocean', 'sky', 'nightfall', 'sunrise']

export function normalizeThemeConfig (config: MermaidThemeConfig): MermaidThemeConfig {
  if (
    !PresetThemes.includes(config.theme as PresetThemeName) &&
    !ExtraThemeNames.includes(config.theme as ExtraThemeName)) {
    config.theme = 'base'
  }
  return config
}

export function applyTheme (code: string, themeConfig: MermaidThemeConfig = {}): string {
  const styleDirective = generateStyleString(normalizeThemeConfig(themeConfig))
  const res = `
  ${styleDirective}
  ${code}
  `
  return res
}

function generateStyleString (styleSettings: MermaidThemeConfig): string {
  return `%%{init: ${JSON.stringify(styleSettings)}}%%`
}


interface ThemeMainVars {
  // ---- Base ----
  /**
   * 是否启用暗黑模式, 会影响颜色计算
   */
    darkMode: boolean
    /**
    * 背景颜色, 默认 #f4f4f4
    */
    background: string
    /**
    * 主色调, 默认 #fff4dd
    */
    primaryColor: string
    /**
    * 次色调, 默认以主色调进行计算
    */
    secondaryColor: string
    /**
    * 第三顺位颜色, 默认以主色调进行计算
    */
    tertiaryColor: string
    // ---- Text & Font ----
    /**
    * 主文字颜色, 根据darkMode的启用与否默认为#ddd, #333
    */
    primaryTextColor: string
    /**
    * 次文字颜色, 根据次色调计算
    */
    secondaryTextColor: string
    /**
    * 字体, 默认 "trebuchet ms", verdana, arial
    */
    fontFamily: string
    /**
   * 文字大小, 默认 16px
   */
    fontSize: string
    /**
   * 文字颜色
   */
    textColor: string
    // ---- Border ----
    /**
    * 主边框颜色, 默认以主色调进行计算
    */
    primaryBorderColor: string
    /**
    * 次边框颜色, 根据次色调计算
    */
    secondaryBorderColor: string
    /**
    * 第三顺位边框颜色, 根据第三顺位颜色计算
    */
    tertiaryBorderColor: string
    
    // ---- Note ----
    /**
    * 笔记块颜色, 默认 #fff5ad
    */
    noteBkgColor: string
    /**
    * 笔记文本颜色, 默认 #333
    */
    noteTextColor: string
    /**
    * 笔记块边框颜色, 默认根据笔记块颜色计算
    */
    noteBorderColor: string
    /**
    * 主要背景色
    */
    mainBkg: string
}

interface ThemeSequenceVars {
  actorBorder: string
  actorBkg: string
  actorTextColor: string
  actorLineColor: string
  labelBoxBkgColor: string
  signalColor: string
  signalTextColor: string
  labelBoxBorderColor: string
  labelTextColor: string
  loopTextColor: string
  activationBorderColor: string
  activationBkgColor: string
  sequenceNumberColor: string
}

interface ThemeGanttVars {
  sectionBkgColor: string
  altSectionBkgColor: string
  sectionBkgColor2: string
  excludeBkgColor: string
  taskBorderColor: string
  taskBkgColor: string
  activeTaskBorderColor: string
  activeTaskBkgColor: string
  gridColor: string
  doneTaskBkgColor: string
  doneTaskBorderColor: string
  critBorderColor: string
  critBkgColor: string
  todayLineColor: string
  taskTextOutsideColor: string
  taskTextLightColor: string
  taskTextColor: string
  taskTextDarkColor: string
  taskTextClickableColor: string

}

interface ThemeJourneyVars {
  fillType0: string
  fillType1: string
  fillType2: string
  fillType3: string
  fillType4: string
  fillType5: string
  fillType6: string
  fillType7: string
}

interface ThemePieVars {
  pie1:string
  pie2:string
  pie3:string
  pie4:string
  pie5:string
  pie6:string
  pie7:string
  pie8:string
  pie9:string
  pie10:string
  pie11:string
  pie12:string
  pieTitleTextSize:string
  pieTitleTextColor:string
  pieSectionTextSize:string
  pieSectionTextColor:string
  pieLegendTextSize:string
  pieLegendTextColor:string
  pieStrokeColor:string
  pieStrokeWidth:string
  pieOpacity:string
}

interface ThemeRequirementVars {
  requirementBackground: string
  requirementBorderColor: string
  requirementBorderSize: string
  requirementTextColor: string
  relationColor: string
  relationLabelBackground: string
  relationLabelColor: string

}

interface ThemeClassVars {
  classText: string
}

interface ThemeStateVars {
  transitionColor: string
  transitionLabelColor: string
  stateLabelColor: string
  stateBkg: string
  labelBackgroundColor: string
  compositeBackground: string
  altBackground: string
  compositeTitleBackground: string
  compositeBorder: string
  innerEndBackground: string
  errorBkgColor: string
  errorTextColor: string
  specialStateColor: string
}

interface ThemeFlowchartVars {
  nodeBkg: string
  mainBkg: string
  nodeBorder: string
  clusterBkg: string
  clusterBorder: string
  defaultLinkColor: string
  titleColor: string
  edgeLabelBackground: string
  nodeTextColor: string
}

interface ThemeDirective {
  init: MermaidThemeConfig
}

type Partial<T> = {
  [key in keyof T]?: T[key]
}
