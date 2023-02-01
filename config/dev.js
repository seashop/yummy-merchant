module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    APIBasePath: JSON.stringify('https://dev-ygo.fly.dev/v1')
  },
  mini: {},
  isWatch: true,
  h5: {
    publicPath: '/yummy-merchant',
    staticDirectory: 'static',
    esnextModules: ['taro-ui']
  }
}
