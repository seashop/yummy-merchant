import { Component, PropsWithChildren } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './result.scss'
import { ProductItem } from '../../../components/mobile/categorylist/CategoryList'

export default class Result extends Component<PropsWithChildren> {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleGoHome = () => {
    Taro.navigateTo({url: '/pages/mobile/home/home'})
  }

  handleGoList = () => {
    Taro.navigateTo({url: '/pages/mobile/order/order'})
  }

  render () {
    return (
      <View className='resultPage'>
        <AtIcon value='home' size='40' color='#333' className='homeIcon' onClick={this.handleGoHome}></AtIcon>
        <AtIcon value='bullet-list' size='40' color='#333' className='listIcon' onClick={this.handleGoList}></AtIcon>
        <View className='status'>Ordered Successfully</View>
        <View className='orderNum'>A006</View>
        <View className='price'>S$ 16.00</View>
        <View className='time'>Order Time: 2022-12-24 08:53:40</View>
        <ScrollView
          className='productList'
          style={{height: 400}}
          scrollWithAnimation
          scrollY
          lowerThreshold={15}
          upperThreshold={15}
        >
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </ScrollView>
        <View className='priceDetail'>
          <View className='priceDetailItem'>
            <View className='detailLeft'>Sub Total</View>
            <View className='detailRight'>S$ 16.00</View>
          </View>
          <View className='priceDetailItem'>
            <View className='detailLeft'>GTS</View>
            <View className='detailRight'>S$ 0</View>
          </View>
          <View className='priceDetailItem'>
            <View className='detailLeft'>SVC</View>
            <View className='detailRight'>S$ 0</View>
          </View>
          <View className='priceDetailItem'>
            <View className='detailLeft'>Total</View>
            <View className='detailRight'>S$ 16.00</View>
          </View>
        </View>
      </View>
    )
  }
}