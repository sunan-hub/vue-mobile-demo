# ui主题色配置

## 第一步、直接在/sec/assets/styles/vant-theme.less文件里修改对应的vant-theme配色

```js
@green: #00f; // 主题色
@red: #ee0a24;
@blue: #1989fa;
@orange: #ff976a;
@orange-dark: #ed6a0c;
```

## 第二步在vue.config.js引入主题

```js
css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${path.join(__dirname, '/src/assets/styles/vant-theme.less')}";`
        }
      }
    }
  }
```

## 第三步 babel.config.js中配置好

```js
module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { modules: false }]],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: (name) => `${name}/style/less`
      }, 'vant'
    ]
  ]
}
```

需要更多配置可以去vant-ui查看
[链接](https://github.com/youzan/vant/blob/dev/src/style/var.less)
