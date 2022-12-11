import { useState } from 'react'
import { View, Image } from '@tarojs/components'
// import { AtAvatar } from 'taro-ui'
import './orderDetail.scss'
import Step from '../../../../components/step/step'

export interface IOrderItemProps {
  title?: string,
  imgsrc?: string,
  tags?: string[],
  stock?: number,
  buyCount?: number,
}

const OrderItem = (props: IOrderItemProps) => {

  const [count, setCount] = useState(props.buyCount);

  const handleBuyCountChange = (val: number) => {
    setCount(val)
  }

  const handleDelete = () => {

  }

  return (
    <View className='orderItem'>
      <Image className='img' mode='aspectFit' src={props.imgsrc!} />
      <View className='itemDetail'>
        <View className='itemTitle'>Red Mojito</View>
        <View className='itemTags'></View>
        <View className='itemPrice'>$ 16.66</View>
      </View>
      <View className='handlePart'>
        <View className='deleteBtn' onClick={handleDelete}>-</View>
        <Step
          className='buyCount'
          min={0}
          max={props.stock}
          step={1}
          value={count as number}
          onChange={handleBuyCountChange}
        />
      </View>
    </View>
  )
}

OrderItem.defaultProps = {
  title: 'MARTINI PROSECCO SPARKLING 11.5% ~',
  imgsrc: 'https://sea.fly.dev/backend/assets/Group%20647@2x.decd18a6.png',
  tags: ['热门'],
  stock: 99999,
  buyCount: 0,
}

export default OrderItem
