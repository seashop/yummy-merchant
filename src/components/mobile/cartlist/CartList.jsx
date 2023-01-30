import { View, Image } from '@tarojs/components'
import path from '../../../utils/path.ts'
import './cartList.scss'

const CartList = props => {
  const { list } = props
  return (
    <View className='cartList'>
      {
        list.map(item => {
          return (
            <CartListItem item={item} key={'item-key-' + item.id} />
          )
        })
      }
    </View>
  )
}

const CartListItem = props => {
  const { item } = props
  return (
    <View className='cartListItem'>
      <Image className='productImg' src={APIBasePath + path.mobile.getImgUrl.replace('{id}', item.imgIds[0])} />
      <View className='productName'>{item.title}</View>
      <View className='price'>S$ {item.price * item.count}</View>
    </View>
  )
}

export default CartList
