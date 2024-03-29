import React, { Component, PropsWithChildren } from 'react'
import { AtBadge, AtFloatLayout, AtActivityIndicator, AtIcon } from 'taro-ui'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './category.scss'
import path from '../../../utils/path'
import CategoryList from '../../../components/mobile/categorylist/CategoryList'
import cartImg from '../../../assets/imgs/cart.png'
import homeIcon from '../../../assets/imgs/homeicon.png'
import emptyCartImg from '../../../assets/imgs/emptycart.png'
import CartList from '../../../components/mobile/cartlist/CartList'

export default class Category extends Component<PropsWithChildren> {

  constructor(props) {
    super(props)
    this.orderInfoRef = React.createRef()
    this.bottomPartRef = React.createRef()
    this.state = {
      otherHeight: 0,
      selectedProductList: [],
      loading: false,
      prevOrderNum: '--',
      isOpened: false,
    }
  }

  componentWillMount () { }

  componentDidMount () {
    setTimeout(() => {
      let topHeight = 0
      let bottomHeight = 0
      Taro.createSelectorQuery().select('#topPart').boundingClientRect((res) => {
        console.log('topPart--->', res)
        topHeight = res.height
      }).exec()
      const bottomQuery = Taro.createSelectorQuery()
      bottomQuery.select('#bottomPart').fields({
        id: true,
        size: true,
      }, function (res) {
        console.log('bottomPart--->', res)
        bottomHeight = res.height
      }).exec()
      const timer = setInterval(() => {
        if (topHeight > 0 && bottomHeight > 0) {
          clearInterval(timer)
          try {
            const res = Taro.getSystemInfoSync()
            const screenHeight = res.windowHeight
            console.log('screenHeight--->', screenHeight, topHeight, bottomHeight)
            this.setState({otherHeight: screenHeight - topHeight - bottomHeight})
          } catch (error) {
            
          }
        }
      }, 200)
    }, 200)
    this.loadOrderList()
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
    // Taro.showLoading({title: 'loading'})
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
          // this.setState({loading: false})
          // Taro.hideLoading()
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
          Taro.hideLoading()
        }
      })
    } catch (error) {
      console.log('loadBaseData error--->', error)
      this.setState({loading: false})
      // Taro.hideLoading()
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

  loadOrderList = () => {
    try {
      const value1 = Taro.getStorageSync('passport').data
      const innId = value1.inns && value1.inns.length > 0 && value1.inns[0].id
      const value2 = Taro.getStorageSync('token')
      const tokenStr = value2.access
      Taro.request({
        url: APIBasePath + path.mobile.getOrderList.replace('{innId}', innId),
        method: 'GET',
        data: {
          ["filter.status"]: 'STAGE_TODO',
          sort: '-created_at'
        },
        header: {
          Authorization: 'Bearer ' + tokenStr,
        },
        success: (res: any) => {
          if (res.statusCode === 200) {
            const orderList = res.data.orderInfos || [];
            if (orderList.length > 0) {
              const orderItem = orderList.pop()
              this.setState({prevOrderNum: orderItem.order.pickCode})
            }
          } else {
            Taro.showToast({
              title: '获取上一个订单失败',
              icon: 'error',
              duration: 2000
            })
          }
        },
        fail: (error: any) => {
          console.log('loadOrderList error--->', error)
        }
      })
    } catch (error) {
      console.log('loadOrderList error--->', error)
    }
  }

  handleShowCart = () => {
    console.log('list--->', this.state.selectedProductList)
    this.setState({
      isOpened: !this.state.isOpened
    })
  }

  handleCartClose = () => {
    this.setState({
      isOpened: false
    })
  }

  handleGoHome = () => {
    Taro.navigateTo({url: '/pages/mobile/home/home'})
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
        <View className='orderInfo' id='topPart' ref={this.orderInfoRef}>前一单取餐码: {this.state.prevOrderNum}</View>
        <CategoryList otherHeight={this.state.otherHeight} handleSelectedProductList={this.handleSelectedProductList} />
        {/* <View className='bottomPart' ref={this.bottomPartRef}>
          <View className='totalPrice'>Total Price: S$ {totalPrice}</View>
          <View className='orderBtn' onClick={this.handleOrder}>Order Now</View>
        </View> */}
        <View className='bottomPart1' id='bottomPart' ref={this.bottomPartRef}>
          <View className='leftPart'>
            <Image src={homeIcon} className='homeIcon' onClick={this.handleGoHome} />
            {
              this.state.selectedProductList.length > 0 ? <AtBadge value={this.state.selectedProductList.length}>
                <Image src={cartImg} className='cartImg' onClick={this.handleShowCart} />
              </AtBadge> : <Image src={emptyCartImg} className='cartImg' />
            }
            <View className='totalPrice'>S$ {totalPrice}</View>
          </View>
          <View className={`rightPart ${this.state.selectedProductList.length > 0 ? 'active' : ''}`} onClick={this.handleOrder}>Order Now</View>
        </View>
        <AtFloatLayout isOpened={this.state.isOpened} title='' scrollY onClose={this.handleCartClose}>
          <CartList list={this.state.selectedProductList} />
        </AtFloatLayout>
        <View className={`mask ${this.state.loading ? '' : 'maskHide'}`}>
          <AtActivityIndicator content='loading...' size={100} color='white'></AtActivityIndicator>
        </View>
      </View>
    )
  }
}