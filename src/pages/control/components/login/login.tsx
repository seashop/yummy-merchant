import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import './login.scss'

interface ILoginProp {
  handleLoginResult: (val: boolean) => void,
}

class Login extends Component<ILoginProp> {

  state = {
    loading: false,
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleClick = () => {
    this.setState({loading: true})
    setTimeout(() => {
      Taro.setStorage({
        key: 'authData',
        data: '123456',
        success: () => {
          this.props.handleLoginResult(true);
        },
        complete: () => {
          this.setState({loading: false})
        }
      })
    }, 1000);
  }

  render() {
    return (
      <View className='login'>
        <Text >您还没有登录，请先登录</Text>
        <AtButton className='loginBtn' type='primary' onClick={this.handleClick} loading={this.state.loading}>登录</AtButton>
      </View>
    )
  }
}

export default Login
