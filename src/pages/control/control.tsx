import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
// import "taro-ui/dist/style/components/button.scss" // 按需引入
import './control.scss'
import Login from './components/login/login'
import Tables from './components/tables/tables'


export default class Control extends Component<PropsWithChildren> {

  state = {
    isLogin: false,
  }

  componentWillMount () { }

  componentDidMount () {
    Taro.getStorage({
      key: 'authData',
      success: (res: any) => {
        console.log('authData--->', res.data);
        this.setState({isLogin: true});
      }
    })
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleLoginResult = (val: boolean) => {
    this.setState({isLogin: val})
  }

  render () {
    return (
      <View className='control'>
        {
          !this.state.isLogin && <Login handleLoginResult={this.handleLoginResult} />
        }
        {
          this.state.isLogin && <Tables />
        }
      </View>
    )
  }
}
