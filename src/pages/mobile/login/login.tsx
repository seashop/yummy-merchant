import { Component, PropsWithChildren } from 'react'
import { View, Input, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import path from '../../../utils/path'
import loginImg from '../../../assets/imgs/loginImg.png'
import './login.scss'

export default class Login extends Component<PropsWithChildren> {

  state = {
    username: 'dev',
    password: 'youShouldChnageMe',
    isLoading: false,
    checked: true,
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
    if (!this.state.checked) {
      return Taro.showToast({
        title: 'please agree policy',
        icon: 'error',
        duration: 2000
      })
    }
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
    Taro.request({
      url: APIBasePath + path.mobile.login,
      method: 'POST',
      data: {username: this.state.username, password: this.state.password},
      success: (res: any) => {
        console.log('login--->', res)
        if (res.statusCode === 200) {
          try {
            Taro.setStorage({key: 'passport', data: res.data.passport})
            Taro.setStorage({key: 'token', data: res.data.token})
          } catch (error) { }
        }
        Taro.hideLoading()
        this.setState({isLoading: false})
        Taro.navigateTo({url: '/pages/mobile/home/home'})
      },
      fail: function (error) {
        console.log('loadProductData error--->', error)
      }
    })
  }

  handleChecked = () => {
    this.setState({checked: !this.state.checked})
  }

  render () {
    return (
      <View className='login'>
        <View className='bg1'>
          <Image src={loginImg} className='loginImg' />
        </View>
        <View className='text1'>Hi, Welcome</View>
        <View className='text2'>Sea shop, your business intelligence  assistant</View>
        <View className='loginForm'>
          <Input type='text' value={this.state.username} onInput={this.handleUsernameChange} placeholder='please input your phone number' focus placeholderTextColor='#BFBFBF' className='input username' />
          <Input type='safe-password' value={this.state.password} onInput={this.handlePasswordChange} password placeholder='please input your password' placeholderTextColor='#BFBFBF' className='input password' />
        </View>
        <View className='loginBtn' onClick={this.handleLogin}>Login</View>
        <View className='policy'>
          <View className={`radio ${this.state.checked ? 'radioChecked' : ''}`} onClick={this.handleChecked}>
            <View className='radioChild'></View>
          </View>
          <View className='radioText'>
            我已阅读并同意
            <View className='span'>《Privacy Policy》</View>
            和
            <View className='span'>《Terms & Conditions》</View>
          </View>
        </View>
      </View>
    )
  }
}
