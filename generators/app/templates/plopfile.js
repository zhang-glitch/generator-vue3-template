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

  // 创建一个组件文件夹
  plop.setGenerator('component-module', {
    description: 'create a component-module',
    prompts: [
      {
        type: 'input',
        name: 'dirname',
        message: 'a component dirname (result: components/{{dirname}})'
      },
      {
        type: 'input',
        name: 'name',
        message:
          'a component name (result: components/{{dirname}}/modules/{{name}}/index.vue)'
      }
    ],
    actions: [
      // eg: helloword/index.ts
      {
        type: 'add',
        path: 'src/components/{{dirname}}/index.ts',
        templateFile: 'plop-templates/component-template/index.ts.hbs'
      },
      // eg: helloword/modules/head/index.vue
      {
        type: 'add',
        path: 'src/components/{{dirname}}/modules/{{name}}/index.vue',
        templateFile: 'plop-templates/component-template/component.vue.hbs'
      }
    ]
  })

  // 追加一个组件文件夹
  plop.setGenerator('append-component-module', {
    description: 'append a component-module',
    prompts: [
      {
        type: 'input',
        name: 'dirname',
        message: 'a component dirname (result: components/{{dirname}})'
      },
      {
        type: 'input',
        name: 'name',
        message:
          'append a component name (result: components/{{dirname}}/modules/{{name}}/index.vue)'
      }
    ],
    actions: [
      // eg: helloword/index.ts
      // 这里会出现问题，所以目前需要自己手动引入
      {
        type: 'append',
        path: 'src/components/{{dirname}}/index.ts',
        templateFile: 'plop-templates/component-template/index.ts.hbs'
      },
      // eg: helloword/modules/head/index.vue
      {
        type: 'add',
        path: 'src/components/{{dirname}}/modules/{{name}}/index.vue',
        templateFile: 'plop-templates/component-template/component.vue.hbs'
      }
    ]
  })

  // 直接创建一个页面文件
  plop.setGenerator('view', {
    description: 'create a page',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'a page name (result: views/{{name}}.vue)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/views/{{name}}.vue',
        templateFile: 'plop-templates/view-template/view.vue.hbs'
      },
      {
        type: 'add',
        path: 'src/router/modules/{{name}}.ts',
        templateFile: 'plop-templates/route-template/route.ts.hbs'
      }
    ]
  })

  // 创建一个页面文件夹
  plop.setGenerator('view-module', {
    description: 'create a page-module',
    prompts: [
      {
        type: 'input',
        name: 'dirname',
        message: 'a page dirname (result: views/{{dirname}})'
      },
      {
        type: 'input',
        name: 'name',
        message:
          'a page name (result: views/{{dirname}}/modules/{{name}}/index.vue)'
      }
    ],
    actions: [
      // 路由入口页面
      {
        type: 'add',
        path: 'src/views/{{dirname}}/index.vue',
        templateFile: 'plop-templates/view-template/parent-view.vue.hbs'
      },
      // 页面组件
      {
        type: 'add',
        path: 'src/views/{{dirname}}/modules/{{name}}/index.vue',
        templateFile: 'plop-templates/view-template/view.vue.hbs'
      },
      // 页面组件统一出口
      {
        type: 'add',
        path: 'src/views/{{dirname}}/modules/index.ts',
        templateFile: 'plop-templates/view-template/index.ts.hbs'
      },
      // 路由文件
      {
        type: 'add',
        path: 'src/router/modules/{{dirname}}.ts',
        templateFile: 'plop-templates/route-template/parent-route.ts.hbs'
      }
    ]
  })

  // 追加一个页面文件夹
  plop.setGenerator('append-view-module', {
    description: 'append a page-module',
    prompts: [
      {
        type: 'input',
        name: 'dirname',
        message: 'append a page dirname (result: views/{{dirname}})'
      },
      {
        type: 'input',
        name: 'name',
        message:
          'append a page name (result: views/{{dirname}}/modules/{{name}}/index.vue)'
      }
    ],
    actions: [
      // eg: helloword/index.ts
      // 这里会出现问题，所以目前需要自己手动引入
      {
        type: 'append',
        path: 'src/views/{{dirname}}/modules/index.ts',
        templateFile: 'plop-templates/view-template/index.ts.hbs'
      },
      // eg: helloword/modules/head/index.vue
      {
        type: 'add',
        path: 'src/views/{{dirname}}/modules/{{name}}/index.vue',
        templateFile: 'plop-templates/view-template/view.vue.hbs'
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
