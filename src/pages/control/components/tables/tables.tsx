import { View } from '@tarojs/components'
import { Component } from 'react'
import TabHead from './tabHead'
import TableList from './tableList'
import './tables.scss'

interface ITablesProp {}

class Tables extends Component<ITablesProp> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render() {
    return (
      <View className='tables'>
        <TabHead activeIndex={0} />
        <TableList />
      </View>
    )
  }
}

export default Tables
