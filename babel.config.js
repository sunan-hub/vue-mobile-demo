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
