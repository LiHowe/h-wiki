---
categories:
  - tools
titleSlug: blender
title: VS Code的使用及配置
thumbnail: ''
series: 其他工具
description: 暂无
wip: true
top: false
---

# VS Code

## Debug

### 预设变量

[官方变量说明](https://code.visualstudio.com/docs/editor/variables-reference)

- **${workspaceFolder}** - 当前VSCode打开的工作区目录路径
- **${workspaceFolderBasename}** - 当前工作区打开的文件夹名称
- **${file}** - 当前编辑的文件完整路径
- **${fileWorkspaceFolder}** - 当前打开的文件的所属工作区文件夹路径
- **${relativeFile}** - 当前打开文件相对于 `workspaceFolder` 的路径
- **${relativeFileDirname}** - 当前打开的文件的所属文件夹相对于 `workspaceFolder` 的路径
- **${fileBasename}** - 当前打开的文件的文件名
- **${fileBasenameNoExtension}** - 当前打开的文件的文件名(不包含拓展名)
- **${fileDirname}** - 当前打开的文件的所属文件夹名称
- **${fileExtname}** - 当前打开的文件的拓展名
- **${cwd}** - the task runner's current working directory on startup
- **${lineNumber}** - 当前打开的文件光标所在行号
- **${selectedText}** - 当前打开的文件选中的文本
- **${execPath}** - VSCode的地址
- **${defaultBuildTask}** - the name of the default build task
- **${pathSeparator}** - 地址分隔符 `/` 或 `\`