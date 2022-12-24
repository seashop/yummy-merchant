import { Component, PropsWithChildren } from 'react'
import { View, ScrollView } from '@tarojs/components'
import './result.scss'
import { ProductItem } from '../../../components/mobile/categorylist/CategoryList'

export default class Result extends Component<PropsWithChildren> {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='resultPage'>
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