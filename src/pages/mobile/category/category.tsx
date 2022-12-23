import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import './category.scss'
import CategoryList from '../../../components/mobile/categorylist/CategoryList'

export default class Category extends Component<PropsWithChildren> {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='categoryPage'>
        {/* <View className='handlePart'>
          <View className='myOrderBtn'>我的订单</View>
        </View> */}
        <CategoryList />
      </View>
    )
  }
}