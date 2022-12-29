import { Component, PropsWithChildren } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
import './result.scss'
import { ProductItem } from '../../../components/mobile/categorylist/CategoryList'
import path from '../../../utils/path'

export default class Result extends Component<PropsWithChildren> {

  $instance = Taro.getCurrentInstance()

  state = {
    orderId: '',
    orderDetail: {},
    productList: [],
    token: '',
  }

  componentWillMount () { }

  componentDidMount () {
    const orderId = this.$instance.router.params.orderId
    this.setState({orderId})
    this.loadOrderDetail(orderId)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  loadOrderDetail = (id) => {
    try {
      const value1 = Taro.getStorageSync('passport').data
      const innId = value1.inns && value1.inns.length > 0 && value1.inns[0].id
      const value2 = Taro.getStorageSync('token')
      const tokenStr = value2.access
      Taro.request({
        url: APIBasePath + path.mobile.getOrderDetail.replace('{innId}', innId).replace('{orderId}', id),
        method: 'GET',
        header: {
          Authorization: 'Bearer ' + tokenStr,
        },
        success: (res: any) => {
          console.log('getOrderDetail success--->', res)
          if (res.statusCode === 200) {
            this.setState({
              orderDetail: res.data.order,
              productList: res.data.products,
              token: tokenStr
            })
          } else {
            Taro.showToast({
              title: '获取订单详情失败',
              icon: 'error',
              duration: 2000
            })
          }
        },
        fail: (error: any) => {
          console.log('getOrderDetail error--->', error)
        }
      })
    } catch (error) {
      console.log('getOrderDetail error--->', error)
    }
  }

  handleGoHome = () => {
    Taro.navigateTo({url: '/pages/mobile/home/home'})
  }

  handleGoList = () => {
    Taro.navigateTo({url: '/pages/mobile/order/order'})
  }

  render () {
    const { orderDetail, productList, token } = this.state
    return (
      <View className='resultPage'>
        <AtIcon value='home' size='40' color='#333' className='homeIcon' onClick={this.handleGoHome}></AtIcon>
        <AtIcon value='bullet-list' size='40' color='#333' className='listIcon' onClick={this.handleGoList}></AtIcon>
        <View className='status'>Ordered Successfully</View>
        <View className='orderNum'>{orderDetail.pickCode}</View>
        <View className='price'>S$ {orderDetail.total}</View>
        <View className='time'>Order Time: {orderDetail.createdAt && orderDetail.createdAt.replace('T', ' ')}</View>
        <ScrollView
          className='productList'
          style={{height: 400}}
          scrollWithAnimation
          scrollY
          lowerThreshold={15}
          upperThreshold={15}
        >
          {
            productList.map((item: any) => {
              return (
                <ProductItem {...item} title={item.productTitle} key={'product-key-' + item.id} token={token} handleSelectedProductList={() => {}} canEdit={false} />
              )
            })
          }
          {/* <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem /> */}
        </ScrollView>
        <View className='priceDetail'>
          <View className='priceDetailItem'>
            <View className='detailLeft'>Sub Total</View>
            <View className='detailRight'>S$ {orderDetail.subTotal}</View>
          </View>
          <View className='priceDetailItem'>
            <View className='detailLeft'>GTS</View>
            <View className='detailRight'>S$ {orderDetail.gtsFee}</View>
          </View>
          <View className='priceDetailItem'>
            <View className='detailLeft'>SVC</View>
            <View className='detailRight'>S$ {orderDetail.svcFee}</View>
          </View>
          <View className='priceDetailItem'>
            <View className='detailLeft'>Total</View>
            <View className='detailRight'>S$ {orderDetail.total}</View>
          </View>
        </View>
      </View>
    )
  }
}