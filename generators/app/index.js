const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  prompting() {
    // 命令行文本交互
    return this.prompt([
      {
        type: 'input',
        name: 'project_name',
        message: 'Your project name',
        default: this.appname
      }
    ]).then((answers) => {
      this.answers = answers
    })
  }

  // 获取模板创建目录结构
  writing() {
    // 把每一个文件都通过模板转换到目标路径
    const templates = [
      '.browserslistrc',
      '.editorconfig',
      '.env.development',
      '.env.production',
      '.env.release',
      '.eslintrc.js',
      '.gitignore',
      '.prettierignore',
      '.prettierrc',
      'babel.config.js',
      "lint-staged.config.js",
      'package.json',
      'plopfile.js',
      'README.md',
      "tsconfig.json",
      "vue.config.js",
      'public/favicon.ico',
      'public/index.html',
      'plop-templates/component-template/component.vue.hbs',
      'plop-templates/component-template/index.ts.hbs',
      'plop-templates/route-template/parent-route.ts.hbs',
      'plop-templates/route-template/route.ts.hbs',
      'plop-templates/store-template/index.ts.hbs',
      'plop-templates/store-template/type.ts.hbs',
      'plop-templates/view-template/index.ts.hbs',
      'plop-templates/view-template/parent-view.vue.hbs',
      'plop-templates/view-template/view.vue.hbs',
      'src/App.vue',
      'src/main.ts',
      'src/shims-vue.d.ts',
      'src/assets/logo.png',
      'src/http/index.ts',
      'src/http/request.ts',
      'src/http/modules/user.ts',
      'src/router/index.ts',
      'src/router/modules/about.ts',
      'src/router/modules/home.ts',
      'src/router/modules/index.ts',
      'src/store/index.ts',
      'src/store/type.ts',
      'src/store/modules/app/index.ts',
      'src/store/modules/app/type.ts',
      'src/store/modules/main/index.ts',
      'src/store/modules/main/type.ts',
      'src/utils/index.ts',
      'src/views/AboutView.vue',
      'src/views/HomeView.vue'
    ]

    templates.forEach((item) => {
      // item => 每个文件路径
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      )
    })
  }
}
