import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import './category.scss'
import LeftList from './left'
import RightList from './right'


export default class Category extends Component<PropsWithChildren> {

  state = {
    height: 0,
    activeIndex: '1',
  }

  componentWillMount () { }

  componentDidMount () {
    try {
      const res = Taro.getSystemInfoSync()
      this.setState({height: res.windowHeight})
    } catch (error) {
      
    }
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  updateActiveIndex = (val: string) => {
    this.setState({activeIndex: val})
  }

  render () {
    return (
      <View className='category' style={{height: this.state.height}}>
        <LeftList height={this.state.height} activeIndex={this.state.activeIndex} />
        <RightList height={this.state.height} updateActiveIndex={this.updateActiveIndex} />
      </View>
    )
  }
}
