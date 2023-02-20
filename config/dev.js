import { gitHash, buildDate } from "./util";

module.exports = {
  env: {
    NODE_ENV: '"development"',
    GIT_HASH: JSON.stringify(gitHash()),
    BUILD_DATE: JSON.stringify(buildDate())
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
