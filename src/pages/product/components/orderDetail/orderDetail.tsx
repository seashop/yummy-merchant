import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import './orderDetail.scss'
import TableDetail from './tableDetail'

class OrderDetail extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='orderDetail'>
        <TableDetail />
      </View>
    )
  }
}

export default connect()(OrderDetail)
