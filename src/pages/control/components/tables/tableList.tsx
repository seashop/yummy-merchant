import { View, Text } from '@tarojs/components'
import { Component } from 'react'
import './tables.scss'

interface ITableListProp {}

class TableList extends Component<ITableListProp> {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render() {
    return (
      <View className='tablelist'>
        <View className='listitem'>
          <Text className='no'>2-01</Text>
          <View className='status'>
            <Text>空闲</Text>
            <Text className='num'>(0人)</Text>
          </View>
          <Text className='price'>$ 230.22</Text>
        </View>
        <View className='listitem'>
          <Text className='no'>2-01</Text>
          <View className='status'>
            <Text>空闲</Text>
            <Text className='num'>(0人)</Text>
          </View>
          <Text className='price'>$ 230.22</Text>
        </View>
        <View className='listitem'>
          <Text className='no'>2-01</Text>
          <View className='status'>
            <Text>空闲</Text>
            <Text className='num'>(0人)</Text>
          </View>
          <Text className='price'>$ 230.22</Text>
        </View>
        <View className='listitem'>
          <Text className='no'>2-01</Text>
          <View className='status'>
            <Text>空闲</Text>
            <Text className='num'>(0人)</Text>
          </View>
          <Text className='price'>$ 230.22</Text>
        </View>
        <View className='listitem'>
          <Text className='no'>2-01</Text>
          <View className='status'>
            <Text>空闲</Text>
            <Text className='num'>(0人)</Text>
          </View>
          <Text className='price'>$ 230.22</Text>
        </View>
        <View className='listitem'>
          <Text className='no'>2-01</Text>
          <View className='status'>
            <Text>空闲</Text>
            <Text className='num'>(0人)</Text>
          </View>
          <Text className='price'>$ 230.22</Text>
        </View>
      </View>
    )
  }
}

export default TableList
