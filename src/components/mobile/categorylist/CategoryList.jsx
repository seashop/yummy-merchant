import { useState, useEffect } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import Taro from '@tarojs/taro'
import './categoryList.scss'
import path from '../../../utils/path.ts'
import MerchantImage from '../image/image'

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

  const { otherHeight, handleSelectedProductList } = props;
  const [height, setHeight] = useState(0)
  const [activeId, setActiveId] = useState(0)
  const [categoryList, setCategoryList] = useState([])
  const [productList, setProductList] = useState([])
  const [showsProductList, setShowsProductList] = useState([])
  const [innId, setInnId] = useState('')
  const [token, setToken] = useState('')

  const handleRightScroll = (e) => {
    console.log('rightScroll--->', e.detail.scrollTop)
  }

  const handleCategoryChange = (val) => {
    setActiveId(val)
  }

  const loadCategoryData = () => {
    Taro.request({
      url: APIBasePath + path.mobile.getCategoryList.replace('{innId}', innId),
      method: 'GET',
      header: {
        Authorization: 'Bearer ' + token,
      },
      success: function (res) {
        console.log('loadCategoryData--->', res)
        if (res.statusCode === 200) {
          const temp = res.data.productCats
          temp.forEach(item => {
            item.category_id = item.id
            item.productList = []
          })
          setCategoryList(temp)
          if (res.data.productCats.length > 0) {
            setActiveId(res.data.productCats[0].category_id)
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
      url: APIBasePath + path.mobile.getProductList.replace('{innId}', innId),
      method: 'POST',
      data: { page_size: 1000 },
      header: {
        Authorization: 'Bearer ' + token,
      },
      success: function (res) {
        console.log('loadProductData--->', res)
        if (res.statusCode === 200) {
          const temp = res.data.products
          temp.forEach(item => {
            item.category_id = item.catId
          })
          setProductList(temp)
        }
      },
      fail: function (error) {
        console.log('loadProductData error--->', error)
      }
    })
  }

  const loadBaseData = () => {
    try {
      const value1 = Taro.getStorageSync('passport').data
      const id = value1.inns && value1.inns.length > 0 && value1.inns[0].id
      const value2 = Taro.getStorageSync('token')
      const tokenStr = value2.access
      setInnId(id)
      setToken(tokenStr)
    } catch (error) {
      console.log('loadBaseData error--->', error)
    }
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
    loadBaseData()
    // loadCategoryData()
    // loadProductData()
  }, [])

  useEffect(() => {
    if (innId && token) {
      loadCategoryData()
      loadProductData()
    }
  }, [innId, token])

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
  }, [categoryList.length, productList.length])
  
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
              <ProductItem {...product} key={'product-key-' + product.id} token={token} handleSelectedProductList={handleSelectedProductList} />
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
  const { imgIds, price, title, token, stock, handleSelectedProductList, id, canEdit = true } = props
  const [count, setCount] = useState(0)
  const imgId = imgIds.length > 0 ? imgIds[0] : ''
  const handleBuyCountChange = val => {
    setCount(val)
    handleSelectedProductList({
      id,
      imgIds,
      price,
      title,
      count: val
    })
  }
  return (
    <View className='productItem'>
      <MerchantImage token={token} width={250} id={imgId} />
      <View className='rightPart'>
        <View className='productName'>{title}</View>
        <View className='productPrice'>S$ {price.toFixed(2)}</View>
        {
          canEdit && <AtInputNumber
            className='buyCount'
            min={0}
            max={stock}
            step={1}
            value={count}
            onChange={handleBuyCountChange}
          />
        }
      </View>
    </View>
  )
}

export default CategoryList
