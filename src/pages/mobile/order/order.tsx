import { Component, PropsWithChildren } from 'react'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import Tabs from '../../../components/mobile/tabs/tabs'
import path from '../../../utils/path'
import List, { TypeEnum, StatusEnum } from '../../../components/mobile/list/list'
import HomeIcon from '../../../assets/imgs/homeicon.png'
import './order.scss'


export default class Order extends Component<PropsWithChildren> {

  state = {
    current: 0,
    tabList: [{ title: '新订单', index: 0 }, { title: '待备餐', index: 1 }, { title: '已完成', index: 2 }],
    listData: [{
      id: '1',
      num: 'A002',
      type: TypeEnum.IN,
      time: '14:22:22',
      price: 220.00,
      status: StatusEnum.NEW
    }]
  }

  componentWillMount () { }

  componentDidMount () {
    this.loadOrderList('STAGE_TODO')
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange = (cur: any) => {
    if (cur === this.state.current) return
    if (cur.detail) {
      console.log('handleChange--->', cur.detail)
      this.setState({current: Number(cur.detail.current)})
    } else {
      this.setState({current: Number(cur)})
    }
    switch (cur) {
      case 0:
        this.loadOrderList('STAGE_TODO')
        break;
      case 1:
        this.loadOrderList('STAGE_WAIT')
        break;
      case 2:
        this.loadOrderList('STAGE_DONE')
        break;
      default:
        break;
    }
  }

  loadOrderList = (status: string) => {
    try {
      const value1 = Taro.getStorageSync('passport').data
      const innId = value1.inns && value1.inns.length > 0 && value1.inns[0].id
      const value2 = Taro.getStorageSync('token')
      const tokenStr = value2.access
      Taro.request({
        url: APIBasePath + path.mobile.getOrderList.replace('{innId}', innId),
        method: 'GET',
        data: {
          ["filter.status"]: status,
          sort: status === 'STAGE_WAIT' ?  '+payment_at' : '-created_at'
        },
        header: {
          Authorization: 'Bearer ' + tokenStr,
        },
        success: (res: any) => {
          if (res.statusCode === 200) {
            const orderList = res.data.orderInfos || [];
            if (orderList.length > 0) {
              orderList.forEach(item => {
                item.key = item.order.id
              })
              this.setState({
                listData: orderList
              })
            } else {
              this.setState({
                listData: []
              })
            }
          } else {
            Taro.showToast({
              title: '获取订单列表失败',
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

  handleGoHome = () => {
    Taro.navigateTo({url: '/pages/mobile/home/home'})
  }

  render () {
    return (
      <View className='order'>
        <View className='bottomPart'>
          <Image src={HomeIcon} className='homeIcon' onClick={this.handleGoHome}></Image>
        </View>
        <Tabs current={this.state.current} tabList={this.state.tabList} onChange={this.handleChange} />
        {/* <Swiper
          className='tabContent'
          currentItemId={'itemId-' + (this.state.current === 2 ? '222' : this.state.current)}
          onChange={this.handleChange}
        >
          <SwiperItem itemId='itemId-0'>
            <List data={this.state.listData} paymentStatus='STATUS_UNPAID' status='STAGE_TODO' />
          </SwiperItem>
          <SwiperItem itemId='itemId-1'>
            <List data={this.state.listData} paymentStatus='STATUS_PAID' status='STAGE_WAIT' />
          </SwiperItem>
          <SwiperItem itemId='itemId-222'>
            <List data={this.state.listData} status='STAGE_DONE' paymentStatus='STATUS_PAID' />
          </SwiperItem>
        </Swiper> */}
        {
          this.state.current === 0 && <List data={this.state.listData} paymentStatus='STATUS_UNPAID' status='STAGE_TODO' loadOrderList={this.loadOrderList}/>
        }
        {
          this.state.current === 1 && <List data={this.state.listData} paymentStatus='STATUS_PAID' status='STAGE_WAIT' loadOrderList={this.loadOrderList}/>
        }
        {
          this.state.current === 2 && <List data={this.state.listData} status='STAGE_DONE' paymentStatus='STATUS_PAID' loadOrderList={this.loadOrderList}/>
        }
      </View>
    )
  }
}
