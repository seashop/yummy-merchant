import { useState, useEffect } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import Taro from '@tarojs/taro'
import './categoryList.scss'
import path from '../../../utils/path.ts'

const Threshold = 15

// const categoryList = [
//   {
//     name: 'aaaa',
//     id: 1,
//   },
//   {
//     name: 'bbbb',
//     id: 2,
//   },
//   {
//     name: 'cccc',
//     id: 3,
//   }
// ]

const CategoryList = props => {

  const { otherHeight } = props;
  const [height, setHeight] = useState(0)
  const [activeId, setActiveId] = useState(0)
  const [categoryList, setCategoryList] = useState([])
  const [productList, setProductList] = useState([])
  const [showsProductList, setShowsProductList] = useState([])

  const handleRightScroll = (e) => {
    console.log('rightScroll--->', e.detail.scrollTop)
  }

  const handleCategoryChange = (val) => {
    setActiveId(val)
  }

  const loadCategoryData = () => {
    Taro.request({
      url: APIBasePath + path.mobile.getCategoryList,
      method: 'GET',
      success: function (res) {
        console.log('loadCategoryData--->', res)
        if (res.statusCode === 200 && res.data.code === 0) {
          const temp = res.data.result.items
          temp.forEach(item => item.productList = [])
          setCategoryList(temp)
          if (res.data.result.items.length > 0) {
            setActiveId(res.data.result.items[0].category_id)
          }
        }
      },
      fail: function (error) {
        console.log('loadCategoryData error--->', error)
      }
    })
  }

  const loadProductData = () => {
    Taro.request({
      url: APIBasePath + path.mobile.getProductList,
      method: 'GET',
      success: function (res) {
        console.log('loadProductData--->', res)
        if (res.statusCode === 200 && res.data.code === 0) {
          setProductList(res.data.result.items)
        }
      },
      fail: function (error) {
        console.log('loadProductData error--->', error)
      }
    })
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

  useEffect(() => {
    loadCategoryData()
    loadProductData()
  }, [])

  useEffect(() => {
    if (categoryList.length > 0 && productList.length > 0) {
      const temp = [...categoryList]
      let temp1 = []
      temp.forEach(item => {
        item.productList = productList.filter(product => product.category_id === item.category_id)
        temp1 = temp1.concat(item.productList)
      })
      setCategoryList([...temp])
      setShowsProductList(temp1)
    }
  }, [categoryList, categoryList.length, productList, productList.length])
  
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
              <CategoryItem handleCategoryChange={handleCategoryChange} {...item} key={'category-item-key-' + item.category_id} active={item.category_id === activeId} />
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
        {
          showsProductList.map(product => {
            return (
              <ProductItem {...product} key={'product-key-' + product.goods_id} />
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const CategoryItem = props => {
  const { category_id, title, active, handleCategoryChange } = props
  const handleClick = () => {
    handleCategoryChange(category_id)
  }
  return (
    <View onClick={handleClick} className={`categoryItem ${active ? 'active' : ''}`}>
      {title}
    </View>
  )
}

export const ProductItem = props => {
  const { img, price, title } = props
  const [count, setCount] = useState(0)
  const imgsrc = img.full_url
  const handleBuyCountChange = val => {
    setCount(val)
  }
  return (
    <View className='productItem'>
      <Image className='img' src={imgsrc} defaultSource='https://sea.fly.dev/backend/assets/Group%20647@2x.decd18a6.png' />
      <View className='rightPart'>
        <View className='productName'>{title}</View>
        <View className='productPrice'>S$ {price}</View>
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
