module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    APIBasePath: JSON.stringify('https://sea.fly.dev/api/v0')
  },
  mini: {},
  isWatch: true,
  h5: {
    esnextModules: ['taro-ui']
  }
}
