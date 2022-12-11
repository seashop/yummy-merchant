import { View } from '@tarojs/components'
import { Component } from 'react'
import { AtButton } from 'taro-ui'
import './tables.scss'

interface ITabHeadProp {
  activeIndex?: number
}

class TabHead extends Component<ITabHeadProp> {
  state = {
    loading: false,
    activeIndex: this.props.activeIndex || 0
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleRefresh = () => {
    this.setState({loading: true})
  }

  handleClick = (val: number) => {
    this.setState({
      activeIndex: val
    })
  }

  render() {
    return (
      <View className='tabhead'>
        <View className='floorlist'>
          <View onClick={() => this.handleClick(0)} className={`flooritem ${this.state.activeIndex === 0 ? 'active' : ''}`}>2楼大厅</View>
          <View onClick={() => this.handleClick(1)} className={`flooritem ${this.state.activeIndex === 1 ? 'active' : ''}`}>3楼大厅</View>
          <View onClick={() => this.handleClick(2)} className={`flooritem ${this.state.activeIndex === 2 ? 'active' : ''}`}>4楼大厅</View>
        </View>
        <AtButton type='primary' className='refreshBtn' loading={this.state.loading} onClick={this.handleRefresh}>刷新</AtButton>
      </View>
    )
  }
}

export default TabHead
