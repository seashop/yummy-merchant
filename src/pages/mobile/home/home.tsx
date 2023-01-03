import { Component, PropsWithChildren } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import home0Img from '../../../assets/imgs/home0.png'
import home1Img from '../../../assets/imgs/home1.png'
import home2Img from '../../../assets/imgs/home2.svg'
import home3Img from '../../../assets/imgs/home3.png'
import home4Img from '../../../assets/imgs/home4.png'
import './home.scss'

export default class Home extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='home'>
        <View className='textPart'>
          <Image src={home0Img} className='home0Img' />
          <View className='text'>Sea Shop,</View>
          <View className='text'>your business</View>
          <View className='text'>intelligence assistant!</View>
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
        <View className='handlePart orderPart'>
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
