import { Component, PropsWithChildren } from 'react'
import { View, Input } from '@tarojs/components'
import './login.scss'

export default class Login extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='login'>
        <View className='bg1'></View>
        <View className='text1'>Hi, Welcome</View>
        <View className='text2'>Sea shop, your business intelligence  assistant</View>
        <View className='loginForm'>
          <Input type='text' placeholder='please input your phone number' focus placeholderTextColor='#BFBFBF' className='input username' />
          <Input type='safe-password' placeholder='please input your password' placeholderTextColor='#BFBFBF' className='input password' />
        </View>
        <View className='loginBtn'>Login</View>
      </View>
    )
  }
}
