import { Component, PropsWithChildren } from 'react'
import { View, Swiper, SwiperItem } from '@tarojs/components'
import Tabs from '../../../components/mobile/tabs/tabs'
import List, { TypeEnum, StatusEnum } from '../../../components/mobile/list/list'
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

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleChange = (cur: number) => {
    this.setState({current: cur})
  }

  render () {
    return (
      <View className='order'>
        <Tabs current={this.state.current} tabList={this.state.tabList} onChange={this.handleChange} />
        <Swiper
          className='tabContent'
        >
          <SwiperItem>
            <List data={this.state.listData} />
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-2'>2</View>
          </SwiperItem>
          <SwiperItem>
            <View className='demo-text-3'>3</View>
          </SwiperItem>
        </Swiper>
      </View>
    )
  }
}
