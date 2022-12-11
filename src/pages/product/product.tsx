import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import './product.scss'
import OrderDetail from './components/orderDetail/orderDetail'
import Category from './components/category/category'

export default class Product extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='product'>
        <OrderDetail />
        <Category />
      </View>
    )
  }
}
