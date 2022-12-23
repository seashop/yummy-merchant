import { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import './categoryList.scss'

const CategoryList = props => {
  
  return (
    <View className='categoryList'>
      <View className='leftPart'>leftPart</View>
      <View className='productList'>
        <ProductItem />
      </View>
    </View>
  )
}

const ProductItem = props => {
  const [count, setCount] = useState(0)
  const imgsrc = 'https://sea.fly.dev/backend/assets/Group%20647@2x.decd18a6.png'
  const handleBuyCountChange = val => {
    setCount(val)
  }
  return (
    <View className='productItem'>
      <Image className='img' src={imgsrc} />
      <View className='rightPart'>
        <View className='productName'>MARTINI PROSECCO SPARKLING 11.5% ~</View>
        <View className='productPrice'>S$ 16.00</View>
        <AtInputNumber
          className='buyCount'
          min={0}
          max={100}
          step={1}
          value={count}
          onChange={handleBuyCountChange}
        />
      </View>
    </View>
  )
}

export default CategoryList
