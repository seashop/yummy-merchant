import { Component, PropsWithChildren } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import path from '../../../utils/path'
import home0Img from '../../../assets/imgs/home0.png'
import home1Img from '../../../assets/imgs/home1.png'
import home2Img from '../../../assets/imgs/home2.svg'
import home3Img from '../../../assets/imgs/home3.png'
import home4Img from '../../../assets/imgs/home4.png'
import homeHeadImg from '../../../assets/imgs/homehead.png'
import './home.scss'

export default class Home extends Component<PropsWithChildren> {

  state = {
    welcomeText: '',
    innName: 'XXXXX店'
  }

  componentWillMount () { }

  componentDidMount () {
    const hours = new Date().getHours()
    if (hours > 12) {
      this.setState({welcomeText: '下午好'})
    } else {
      this.setState({welcomeText: '上午好'})
    }
    this.handleInnDetail()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleInnDetail = () => {
    try {
      const value1 = Taro.getStorageSync('passport').data
      const innId = value1.inns && value1.inns.length > 0 && value1.inns[0].id
      const value2 = Taro.getStorageSync('token')
      const tokenStr = value2.access
      Taro.request({
        url: APIBasePath + path.mobile.getInnDetail.replace('{innId}', innId),
        method: 'GET',
        header: {
          Authorization: 'Bearer ' + tokenStr,
        },
        success: (res: any) => {
          if (res.statusCode === 200) {
            console.log('handleInnDetail--->', res.data)
          } else {
            Taro.showToast({
              title: '获取商铺信息失败',
              icon: 'error',
              duration: 2000
            })
          }
        },
        fail: (error: any) => {
          console.log('handleInnDetail error--->', error)
        }
      })
    } catch (error) {
      console.log('handleInnDetail error--->', error)
    }
  }

  render () {
    return (
      <View className='home'>
        {/* <View className='innInfo'>
          <View className='welcome'>{this.state.welcomeText}</View>
          <View className='innName'>{this.state.innName}</View>
        </View> */}
        {/* <Image src={home0Img} className='home0Img' /> */}
        {/* <View className='textPart'>
          <Image src={home0Img} className='home0Img' />
          <View className='text'>Sea Shop,</View>
          <View className='text'>your business</View>
          <View className='text'>intelligence assistant!</View>
        </View> */}
        <Image src={homeHeadImg} className='homeHeadImg' />
        <Image src={homeHeadImg} className='homeHeadImg' />
        <View className='innInfo1'>
          <View className='innName'>面包房</View>
          <View className='tongji'>
            <View className='tongjiItem rightLine'>
              <View className='itemNum'>S$ 800.00</View>
              <View className='itemName'>今日营收</View>
            </View>
            <View className='tongjiItem'>
              <View className='itemNum'>5</View>
              <View className='itemName'>笔数</View>
            </View>
          </View>
        </View>
        <View className='handlePart helpPart' onClick={() => Taro.navigateTo({url: '/pages/mobile/category/category'})}>
          <View className='left'>
            <View className='title'>协助下单</View>
            <View className='subTitle'>Order Agent</View>
            <View className='desc'>请在这里协助订单</View>
          </View>
          <View className='rightImg'>
            <Image src={home1Img} />
          </View>
        </View>
        <View className='handlePart orderPart' onClick={() => Taro.navigateTo({url: '/pages/mobile/order/order'})}>
          <View className='left'>
            <View className='title'>订单中心</View>
            <View className='subTitle'>Order Center</View>
            <View className='desc'>请在这里处理新订单</View>
          </View>
          <View className='rightImg'>
          <Image src={home2Img} />
          </View>
        </View>
        <View className='handlePart reportPart'>
          <View className='left'>
            <View className='title'>营收报表</View>
            <View className='subTitle'>Reporting Data</View>
            <View className='desc'>请在这里查看数据报表</View>
          </View>
          <View className='rightImg'>
          <Image src={home3Img} />
          </View>
        </View>
        <View className='handlePart morePart'>
          <View className='left'>
            <View className='title1'>更多功能敬请期待...</View>
            <View className='subTitle'></View>
            <View className='desc'></View>
          </View>
          <View className='rightImg'>
          <Image src={home4Img} />
          </View>
        </View>
      </View>
    )
  }
}
