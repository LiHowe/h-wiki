---
categories:
  - frontend
  - libs
titleSlug: handsontable
title: Handsontable
thumbnail: ''
description: 暂无
series: 工具库
wip: true
top: false
---
# HandsonTable

前端表格组件. 

开源项目免费试用， 商用收费.

## 安装

> 💡 因为官方提供了Vue2组件， 如果Vue2项目使用的话请直接查看 **Vue项目安装**

### 标准安装

1. 首先， 安装依赖
   
    ```bash
    npm install handsontable
    ```
    
2. 在项目中引用
   
    ```jsx
    import Handsontable from 'handsontable'
    import 'handsontable/dist/handsontable.full.css'
    ```
    
3. 实例化表格
   
    ```jsx
    // 表格容器， 表格将会渲染于该元素
    const tableContainer = document.querySelector('#tableContainer')
    // 表格数据
    const data = [
      ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
      ['2019', 10, 11, 12, 13],
      ['2020', 20, 11, 14, 13],
      ['2021', 30, 15, 12, 13]
    ]
    // 表格配置
    const tableOptions = {
    	data,
    	// 开源项目使用该key
    	licenseKey: 'non-commercial-and-evaluation'
    }
    const hot = new Handsontable(tableContainer,tableOptions)
    ```
    

### Vue项目安装

1. 安装依赖
   
    ```bash
    npm install handsontable @handsontable/vue
    ```
    
2. 引用组件
   
    ```jsx
    import { HotTable } from '@handsontable/vue'
    import { registerAllModules } from 'handsontable/registry'
    import 'handsontable/dist/handsontable.full.css'
    
    registerAllModules()
    const data = [
      ['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
      ['2019', 10, 11, 12, 13],
      ['2020', 20, 11, 14, 13],
      ['2021', 30, 15, 12, 13]
    ]
    export default {
    	components: {
        HotTable
      },
    	data: () => ({
    		tableSettings: {
    			licenseKey: 'non-commercial-and-evaluation'
    		},
    		tableData: data 
    	})
    }
    ```
    
    ```jsx
    <hot-table :data="tableData" :settings="tableSettings" />
    ```
    

## 配置项

### 界面相关

- `rowHeaders`
    - 类型: `boolean`
    - 作用: 显示表格行头(A、B、C...)
    - 默认值: `false`
- `colHeaders`
    - 类型: `boolean`
    - 作用: 显示表格列序号(1、2、3...)
    - 默认值: `false`

## 相关链接

+ [官网](https://handsontable.com/)
