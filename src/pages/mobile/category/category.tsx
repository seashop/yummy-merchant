import React, { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import './category.scss'
import CategoryList from '../../../components/mobile/categorylist/CategoryList'

export default class Category extends Component<PropsWithChildren> {

  constructor(props) {
    super(props)
    this.orderInfoRef = React.createRef()
    this.bottomPartRef = React.createRef()
    this.state = {
      otherHeight: 0
    }
  }

  componentWillMount () { }

  componentDidMount () {
    setTimeout(() => {
      const height1 = this.orderInfoRef.current.clientHeight
      const height2 = this.bottomPartRef.current.clientHeight
      console.log('height0--->', height1, height2)
      this.setState({
        otherHeight: height1 + height2
      })
    }, 300)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='categoryPage'>
        {/* <View className='handlePart'>
          <View className='myOrderBtn'>我的订单</View>
        </View> */}
        <View className='orderInfo' ref={this.orderInfoRef}>前一单取餐码: A002</View>
        <CategoryList otherHeight={this.state.otherHeight} />
        <View className='bottomPart' ref={this.bottomPartRef}>
          <View className='totalPrice'>Total Price: S$ 36.22</View>
          <View className='orderBtn'>Order Now</View>
        </View>
      </View>
    )
  }
}