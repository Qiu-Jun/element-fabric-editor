<!--
 * @Description: md
 * @Author: June
 * @Date: 2024-04-24 09:32:13
 * @FilePath: /element-fabric-editor/README.md
 * @LastEditTime: 2024-07-26 23:12:44
 * @LastEditors: June
-->

[预览地址](https://ikuaitu.github.io/element-fabric-editor/#/)

#### 差异
> 整体功能是基本一致的，只是更换了`Element Plus`，供大家更多的选择。后面更新仍以`vue-fabric-editor`为主，此项目不定期同步更新。项目存在一定的差异，大概如下
+ 自动导入Commonts 在home组件减少了组件的导入 清晰
+ svg处理采用了不同的插件，但功能是一致的
+ 加入了`unocss`，后续会对样式进行优化
+ 因为ui库风格不一，所以有些风格可能不同，如主题色，边距等

#### 同步情况
+ fix(数字): 增加上下标自定义属性  63481c48313fb6726d444fc86f56e0945973d866

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
    </td>
    <td align="center">
        <a href="https://github.com/nihaojob">
            <img src="https://avatars.githubusercontent.com/u/13534626?v=4" width="80;" alt="nihaojob"/>
            <br />
            <sub><b>nihaojob</b></sub>
        </a>
    </td></tr>
</table>
<!-- readme: collaborators,contributors -end -->