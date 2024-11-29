<!--
 * @Description: md
 * @Author: June
 * @Date: 2024-04-24 09:32:13
 * @FilePath: \element-fabric-editor\README.md
 * @LastEditTime: 2024-11-29 19:17:08
 * @LastEditors: June
-->

## Element Fabric Editor

<!-- <p align="center">
  <a href="" target="_blank">
    <img src="https://img.shields.io/github/stars/Qiu-Jun/element-fabric-editor?style=flat" alt="stars" />
  </a>
	
  <a href="" target="_blank">
    <img src="https://img.shields.io/github/forks/Qiu-Jun/element-fabric-editor?style=flat" alt="stars" />
  </a>
	
  <a href="https://github.com/Qiu-Jun/element-fabric-editor/graphs/contributors" target="_blank">
    <img src="https://img.shields.io/github/contributors/Qiu-Jun/element-fabric-editor" alt="contributors" />
  </a>
  <a href="https://github.com/Qiu-Jun/element-fabric-editor?tab=MIT-1-ov-file" target="_blank">
    <img src="https://img.shields.io/github/license/Qiu-Jun/element-fabric-editor?style=flat" alt="license" />
  </a>
</p> -->

## 简介

快图设计，`vue-fabric-editor` 是一款基于 fabric.js 和 Vue 开发的图片编辑器，可自定义字体、素材、设计模板、右键菜单、快捷键。

`Element Fabric Editor`是由于一个单子甲方需要`ElementPlus`作为组件库，因此诞生而单独维护，`Element Fabric Editor`功能是和`vue-fabric-editor`上是一致的，但在组件划分上`Element Fabric Editor`会更细致，因为`Element Fabric Editor`不考虑`SDK`的打包，所以在组件抽离会更细致

未来`Element Fabric Editor`会把`lib/core`插件化去除，使用hooks+store替换

另外此项目也是[electron-fabric-editor](https://github.com/Qiu-Jun/electron-fabric-editor)的`Render`进程

 
[动图介绍](https://juejin.cn/post/7222141882515128375) · [介绍视频](https://www.bilibili.com/video/BV1US421A7TU/?spm_id_from=333.999.0.0)  · [预览地址](https://qiu-jun.github.io/element-fabric-editor/#/)

#### 使用

```bash
# 如果没有pnpm 项目使用pnpm，commit自动校验都是用pnpm,请使用pnpm启动项目
npm install pnpm -g

pnpm install

pnpm dev

# 提交代码
git add . # 添加需要提交的文件
pnpm commit # 使用此命令编写commit
```

### 已有功能

- 导入 JSON、PSD 文件
- 导出 PNG、SVG、JSON 文件
- 组合/拆分组合
- 图层功能
- 渐变属性
- 外观属性/字体属性/描边/阴影
- 撤销/重做
- 快捷键
- 右键菜单
- 辅助线
- 标尺
- 自定义字体
- 自定义模板素材
- 插入 SVG、图片素材
- 多元素水平、垂直对齐方式
- 背景属性设置
- 箭头/线条
- 画笔/多边形绘制
- 二维码/条形码
- 图片替换/裁剪/滤镜
- 水印
- 国际化

## 贡献规范
+ 修改代码
+ git add .
+ <span style="color: red">pnpm commit</span>(必须, 不接受非规范的commit)

#### 同步情况
+ perf: 优化setSize组件和workspace插件宽高默认值问题 89eead9104ae6824d4dfb9754b13a5790ef79a95

#### undo
- [x] 首页拆分组件
- [x] 使用store 替换 home的provide
- [x] i18n模块化
- [ ] 多画布
- [x] 样式优化(对旧的样式，全部使用unocss)
- [ ] history重构
- [ ] layer图层重构

## 管理员

<!-- readme: collaborators -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/nihaojob">
            <img src="https://avatars.githubusercontent.com/u/13534626?v=4" width="80;" alt="nihaojob"/>
            <br />
            <sub><b>nihaojob</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Qiu-Jun">
            <img src="https://avatars.githubusercontent.com/u/24954362?v=4" width="80;" alt="Qiu-Jun"/>
            <br />
            <sub><b>Qiu-Jun</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: collaborators -end -->

## 贡献者
<!-- readme: collaborators,contributors -start -->
<table>
<tr>
    <td align="center">
        <a href="https://github.com/nihaojob">
            <img src="https://avatars.githubusercontent.com/u/13534626?v=4" width="80;" alt="nihaojob"/>
            <br />
            <sub><b>nihaojob</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Qiu-Jun">
            <img src="https://avatars.githubusercontent.com/u/24954362?v=4" width="80;" alt="Qiu-Jun"/>
            <br />
            <sub><b>Qiu-Jun</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/NoahCodeGG">
            <img src="https://avatars.githubusercontent.com/u/51156988?v=4" width="80;" alt="NoahCodeGG"/>
            <br />
            <sub><b>NoahCodeGG</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/ijry">
            <img src="https://avatars.githubusercontent.com/u/3102798?v=4" width="80;" alt="ijry"/>
            <br />
            <sub><b>ijry</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: collaborators,contributors -end -->