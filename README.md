# generator-hm-cli
通过yeoman构建一个属于自己的脚手架工具,内部使用vue-cli创建的vue3模板。

由于自己每次创建项目时，都需要安装一些重复的依赖，很麻烦。于是就有了创建一个通用的项目脚手架来供自己开发使用。

## yeoman

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/35147b781554489e8df02385ba0ce610~tplv-k3u1fbpfcp-watermark.image?)
我们需要借助 [yeoman](https://yeoman.io/) 来完成我们脚手架的搭建。

yeoman是一个可以帮助开发者快速开启一个新项目的工具集。yoeman提出一个yeoman工作流的概念，通过脚手架工具（yo），构建工具（grunt gulp等）和包管理器（npm bower等）的配合使用让开发者专注于业务的逻辑。

yeoman官方也定义了很多脚手架模板，如果需要我们可以去官网搜索，安装并使用。
- 明确你的需求；
- 找到合适的Generator；
- 全局范围安装找到的Generator；
- 通过Yo运行对应的Generator；`yo generator-name`
- 通过命令行交互填写选项；
- 生成你所需要的项目结构；

yeoman也提供给开发者**如何定义自己的generator**，所有我们自己开发的generator都作为一个插件可以通过yo工具创建出我们需要的结构。注意我们在定义generator时，需要以`generator`开头命名一个包。

我们自定义的generator脚手架模板需要继承自`yeoman-generator`,所以我们需要先下载`npm install yeoman-generator`。

Yeoman Generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法。我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入。
```js
    const Generator = require('yeoman-generator')

    module.exports = class extends Generator {
      writing () {
        // Yeoman 自动在生成文件阶段调用此方法，我们这里尝试往项目目录中写入文件。 参数二表示写入的内容
        this.fs.write(
          this.destinationPath('temp.txt'), // 将一个"llm-zh"写入文件，并创建出来
          "llm-zh"
        )
      }
    }
```
上面那种做法并没有任何意义，yeoman允许我们先定义一个模板，（**注意：这个模板是识别ejs语法的，所以在模板中可以使用ejs语法**）基于这个模板来创建脚手架生成的文件。

`fs.copyTpl`方法可以通过指定模板生成一些文件结构，第三个参数表示传入的一些上下文数据。
```js
 // foo.txt
    这是一个模板文件
    内部可以使用 EJS 模板标记输出数据
    例如：<%= title %>

    其他的 EJS 语法也支持

    <% if (success) { %>
    哈哈哈
    <% }%>
```
```js
writing () {

    // 通过模板方式写入文件到目标目录
    // 模板文件路径
    const tmpl = this.templatePath('foo.txt')
    // 输出目标路径
    const output = this.destinationPath('foo.txt')
    // 模板数据上下文
    const context = { title: 'test title', success: false }

    this.fs.copyTpl(tmpl, output, context)
  }
```
来测试一下，运行一下命令
```
npm link // 将当前脚手架链接成全局模块包
```
全局安装
```
npm install yo -g
```
最后使用脚手架命令，生成项目。
```
yo example
```
最后将会生成一个foo.txt文件
```js
 // foo.txt
    这是一个模板文件
    内部可以使用 EJS 模板标记输出数据
    例如：test title

    其他的 EJS 语法也支持
```
并且我们也可以通过命令行交互，让用户去传入一些内容，定义模板中的一些内容。

`prompt`方法就可以实现。并且可以传入多个询问对象。
```js
    const Generator = require('yeoman-generator')

    module.exports = class extends Generator {
      prompting () {
        // Yeoman 在询问用户环节会自动调用此方法， 在此方法中可以调用父类的 prompt() 方法发出对用户的命令行询问
        return this.prompt([
          {
            type: 'input',
            name: 'name',
            message: 'Your project name',
            default: this.appname // appname 为项目生成目录名称
          },
          {
            type: 'input',
            name: 'age',
            message: 'Your age',
            default: 20 
          }
        ])
        .then(answers => {
          this.answers = answers // {name: "用户输入的内容name", age: "用户输入的age"}
        })
      }
      
      writing () {
        // 通过模板方式写入文件到目标目录 
        // 模板文件路径
        const tmpl = this.templatePath('zh.txt')
        // 输出目标路径
        const output = this.destinationPath('foo.txt')
        // 模板数据上下文
        const context = { title: this.answers.name, success: false }

        this.fs.copyTpl(tmpl, output, context)
      }
    }
```
npm link 将当前脚手架链接到全局，使之成为全局模块包。然后就可以通过`yo generator-name`去创建一个项目了。**注意这里的generator-name使用时不需要加generator的。** 例如我的项目脚手架名称叫`generator-hm-cli`,在使用的时候直接`yo hm-cli`。


## plop
这个库帮助我们在开发阶段通过命令行创建统一的文件模板，不需要我们去粘贴复制相同的文件结构。大大提高了我们的开发效率

使用步骤

- 将 plop 模块作为项目开发依赖安装。`npm install plop -D`
- 在项目根目录下创建一个 `plopfile.js` 文件, 在 `plopfile.js` 文件中定义脚手架任务。可以定义多组内容，通过命令行选择输入。具体配置请查看[plop官网](https://lexmin0412.github.io/plop-cn-docs/)
```js
    module.exports = (plop) => {
      // 直接创建一个组件文件
      plop.setGenerator('component', {
        description: 'create a component',
        prompts: [
          {
            type: 'input',
            name: 'name',
            message: 'a component name (result: components/{{name}}.vue)'
          }
        ],
        actions: [
          {
            type: 'add',
            path: 'src/components/{{name}}.vue',
            templateFile: 'plop-templates/component-template/component.vue.hbs'
          }
        ]
      })

      // 直接创建一个store文件
      plop.setGenerator('store', {
        description: 'create a store-module',
        prompts: [
          {
            type: 'input',
            name: 'name',
            message: 'a store-module name (result: store/module/{{name}}/index.ts)'
          }
        ],
        actions: [
          {
            type: 'add',
            path: 'src/store/modules/{{name}}/index.ts',
            templateFile: 'plop-templates/store-template/index.ts.hbs'
          },
          {
            type: 'add',
            path: 'src/store/modules/{{name}}/type.ts',
            templateFile: 'plop-templates/store-template/type.ts.hbs'
          }
        ]
      })
    }
```
- 编写用于生成特定类型文件的模板。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e533e5e4d2d2493199f5335db36e9680~tplv-k3u1fbpfcp-watermark.image?)
在项目根目录下定义一个vue3的文件模板，需要通过`.hbs`后缀结尾。这个模板文件中可以使用插值语法去获取命令行输入的参数。
```js
    // plop-template/component-template/component.vue.hbs
    <template>
      <div class='{{name}}'>{{name}}</div>
    </template>
    <script lang='ts' setup></script>
    <script lang='ts'>
      import { defineComponent } from 'vue'

      export default defineComponent({
        name: '{{name}}',
        inheritAttrs: false
      })
    </script>
    <style scoped lang='scss'>
      .{{name}} { }
    </style>
```
- 通过 Plop 提供的 CLI 运行脚手架任务

在`package.json`中配置运行命令
```json
    "scripts": {
        "plop": "plop"
    }
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df984ede04964e0da6e1d33efffaa0f6~tplv-k3u1fbpfcp-watermark.image?)
## 最后
通过上面的简单学习，自己动手创建了一个vue3+ts的项目脚手架，内部集成了axios, vue-router, vuex, prettier等等内容。

[npm包](https://www.npmjs.com/package/generator-hm-cli)

使用
```js
    npm install yo generator-hm-cli -g

    yo hm-cli
```

[源码在这里](https://github.com/zhang-glitch/generator-vue3-template/tree/main)

作者：Spirited_Away
链接：https://juejin.cn/post/7215528103468515388
