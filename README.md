<!--
 * @Description: md
 * @Author: June
 * @Date: 2024-04-24 09:32:13
 * @FilePath: \element-fabric-editor\README.md
 * @LastEditTime: 2024-10-20 16:01:22
 * @LastEditors: June
-->

[预览地址](https://qiu-jun.github.io/element-fabric-editor/#/)

#### 贡献规范
+ 修改代码
+ git add .
+ <span style="color: red">pnpm commit</span>(必须)

#### 同步情况
+ docs: add License link  ba4d092b843cd716f06e94d45976d8e0e07e3b21

#### 使用

```bash
# 如果没有pnpm 项目使用pnpm，commit自动校验都是用pnpm,请使用pnpm启动项目
npm install pnpm -g

pnpm install

# 启动uniapp
pnpm dev:weapp

# 提交代码
git add . # 添加需要提交的文件
pnpm commit # 使用此命令编写commit
```

#### undo
- [ ] ui仿搞定(进行中)
- [x] 首页拆分组件
- [ ] 使用store 替换 home的provide
- [ ] 多画布
- [ ] 样式优化(对旧的样式，全部使用unocss)
- [ ] history重构
- [ ] layer图层重构

#### 自动注释说明

> 使用的是korofileheader
> .vscode/settings.json

```json
"fileheader.customMade": {
  "Description": "", //文件内容描述
  "Author": "Your Name", //编辑人
  "Date": "Do not edit", //时间
  "FilePath": "", // 设置后，默认生成文件相对于项目的路径
  "LastEditTime": "Do not edit",
  "LastEditors": "Your Name"
},
```

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