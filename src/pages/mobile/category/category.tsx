import React, { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './category.scss'
import path from '../../../utils/path'
import CategoryList from '../../../components/mobile/categorylist/CategoryList'

export default class Category extends Component<PropsWithChildren> {

  constructor(props) {
    super(props)
    this.orderInfoRef = React.createRef()
    this.bottomPartRef = React.createRef()
    this.state = {
      otherHeight: 0,
      selectedProductList: [],
      loading: false,
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

  handleOrder = () => {
    if (this.state.selectedProductList.length === 0) {
      return Taro.showToast({
        title: '请先选择餐品',
        icon: 'error',
        duration: 2000
      })
    }
    if (this.state.loading) return
    this.setState({loading: true});
    try {
      const value1 = Taro.getStorageSync('passport').data
      const innId = value1.inns && value1.inns.length > 0 && value1.inns[0].id
      const value2 = Taro.getStorageSync('token')
      const tokenStr = value2.access
      Taro.request({
        url: APIBasePath + path.mobile.createOrder.replace('{innId}', innId),
        method: 'POST',
        header: {
          Authorization: 'Bearer ' + tokenStr,
        },
        data: {
          products: this.state.selectedProductList.map((item: any) => {
            return {
              product_id: item.id,
              quantity: item.count,
            }
          })
        },
        success: (res: any) => {
          console.log('createOrder success--->', res)
          this.setState({loading: false})
          if (res.statusCode === 200) {
            Taro.navigateTo({url: '/pages/mobile/result/result?orderId=' + res.data.order.id})
          } else {
            Taro.showToast({
              title: '创建订单失败',
              icon: 'error',
              duration: 2000
            })
          }
        },
        fail: (error: any) => {
          console.log('createOrder error--->', error)
          this.setState({loading: false})
        }
      })
    } catch (error) {
      console.log('loadBaseData error--->', error)
      this.setState({loading: false})
    }
    // Taro.navigateTo({url: '/pages/mobile/result/result'})
  }

  handleSelectedProductList = (product: any) => {
    const list = this.state.selectedProductList;
    if (list.filter((item: any) => item.id === product.id).length > 0) {
      list.find((item: any) => item.id === product.id).count = product.count;
    } else {
      list.push(product);
    }
    this.setState({selectedProductList: list});
    console.log('list--->', list);
  }

  render () {
    const totalPrice = this.state.selectedProductList.reduce((total, cur) => {
      return Number(Number(total) + (Number(cur.price) * Number(cur.count))).toFixed(2);
    }, 0);
    return (
      <View className='categoryPage'>
        {/* <View className='handlePart'>
          <View className='myOrderBtn'>我的订单</View>
        </View> */}
        <View className='orderInfo' ref={this.orderInfoRef}>前一单取餐码: A002</View>
        <CategoryList otherHeight={this.state.otherHeight} handleSelectedProductList={this.handleSelectedProductList} />
        <View className='bottomPart' ref={this.bottomPartRef}>
          <View className='totalPrice'>Total Price: S$ {totalPrice}</View>
          <View className='orderBtn' onClick={this.handleOrder}>Order Now</View>
        </View>
      </View>
    )
  }
}