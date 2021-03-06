module.exports = {
  presets: [['@vue/cli-plugin-babel/preset', { modules: false }]],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
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
