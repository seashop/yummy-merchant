import { useState, useEffect } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import Taro from '@tarojs/taro'
import './categoryList.scss'

const Threshold = 15

const categoryList = [
  {
    name: 'aaaa',
    id: 1,
  },
  {
    name: 'bbbb',
    id: 2,
  },
  {
    name: 'cccc',
    id: 3,
  }
]

const CategoryList = props => {

  const { otherHeight } = props;
  const [height, setHeight] = useState(0)
  const [activeId, setActiveId] = useState(1)

  const handleRightScroll = (e) => {
    console.log('rightScroll--->', e.detail.scrollTop)
  }

  const handleCategoryChange = (val) => {
    setActiveId(val)
  }

  useEffect(() => {
    if (otherHeight > 0) {
      try {
        const res = Taro.getSystemInfoSync()
        const screenHeight = res.windowHeight
        setHeight(screenHeight - otherHeight)
        console.log('height--->', screenHeight, otherHeight)
      } catch (error) {
        
      }
    }
  }, [otherHeight])
  
  return (
    <View className='categoryList'>
      <ScrollView
        className='leftPart'
        style={{height}}
        scrollWithAnimation
        scrollY
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
      >
        {
          categoryList.map(item => {
            return (
              <CategoryItem handleCategoryChange={handleCategoryChange} {...item} key={'category-item-key-' + item.id} active={item.id === activeId} />
            )
          })
        }
      </ScrollView>
      <ScrollView
        className='productList'
        style={{height}}
        scrollWithAnimation
        scrollY
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScroll={handleRightScroll}
      >
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </ScrollView>
    </View>
  )
}

const CategoryItem = props => {
  const { id, name, active, handleCategoryChange } = props
  const handleClick = () => {
    handleCategoryChange(id)
  }
  return (
    <View onClick={handleClick} className={`categoryItem ${active ? 'active' : ''}`}>
      {name}
    </View>
  )
}

export const ProductItem = props => {
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
