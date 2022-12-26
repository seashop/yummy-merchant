import { Component, PropsWithChildren } from 'react'
import { View, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './login.scss'

export default class Login extends Component<PropsWithChildren> {

  state = {
    username: '',
    password: '',
    isLoading: false,
  }

  componentWillMount () { }

  componentDidMount () {
    console.log('apibasepath--->', APIBasePath)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleUsernameChange = (e: any) => {
    console.log('username--->', e.detail.value);
    this.setState({username: e.detail.value})
  }

  handlePasswordChange = (e: any) => {
    console.log('password--->', e.detail.value);
    this.setState({password: e.detail.value})
  }

  handleLogin = () => {
    if (this.state.isLoading) return
    console.log('login--->', this.state)
    if (this.state.username === '') {
      return Taro.showToast({
        title: 'please input username',
        icon: 'error',
        duration: 2000
      })
    }
    if (this.state.password === '') {
      return Taro.showToast({
        title: 'please input password',
        icon: 'error',
        duration: 2000
      })
    }
    this.setState({isLoading: true})
    Taro.showLoading({title: 'loading'})
    setTimeout(() => {
      Taro.hideLoading()
      this.setState({isLoading: false})
      Taro.navigateTo({url: '/pages/mobile/home/home'})
    }, 2000)
  }

  render () {
    return (
      <View className='login'>
        <View className='bg1'></View>
        <View className='text1'>Hi, Welcome</View>
        <View className='text2'>Sea shop, your business intelligence  assistant</View>
        <View className='loginForm'>
          <Input type='text'onInput={this.handleUsernameChange} placeholder='please input your phone number' focus placeholderTextColor='#BFBFBF' className='input username' />
          <Input type='safe-password' onInput={this.handlePasswordChange} password placeholder='please input your password' placeholderTextColor='#BFBFBF' className='input password' />
        </View>
        <View className='loginBtn' onClick={this.handleLogin}>Login</View>
      </View>
    )
  }
}
