import { useState, useEffect, useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, ScrollView } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import Taro from '@tarojs/taro'
import { productAction } from '../../../store/actions/product.actions'
import './categoryList.scss'
import path from '../../../utils/path.ts'
import MerchantImage from '../image/image'
import { throttle } from '../../..//utils/utils'

// const Threshold = 15

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
  // const [height, setHeight] = useState(0)
  const [activeId, setActiveId] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [productList, setProductList] = useState([])
  // const [showsProductList, setShowsProductList] = useState([])
  // const [heightArr, setHeightArr] = useState([])
  const [innId, setInnId] = useState('')
  const [token, setToken] = useState('')

  const [offsetArr, setOffsetArr] = useState([])
  const [scrollTop, setScrollTop] = useState(0)
  const [data, setData] = useState([])
  const ref = useRef(null)
  const scrollTag = useSelector(state => {
    return state.productReducer.scrollTag
  })

  console.log('scrollTag--->', scrollTag)

  const dispatch = useDispatch()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleRightScroll = useCallback(throttle((e) => {
    const offsetTop = e.detail.scrollTop
    console.log('offsetTop--->', offsetTop, categoryList[0].id)
    if (scrollTag) {
      return dispatch({
        type: productAction.CHANGE_SCROLL_TAG,
        payload: {
          scrollTag: false
        }
      })
    }
    for (let i = 0; i < offsetArr.length; i++) {
      if (i === offsetArr.length - 1) {
        if (offsetTop >= offsetArr[i]) {
          scrollCategoryChange(categoryList[i].id)
          break
        }
      }
      if (offsetTop >= offsetArr[i] && offsetTop <= offsetArr[i + 1]) {
        scrollCategoryChange(categoryList[i].id)
        break
      }
    }
  }, 200), [scrollTop, offsetArr, scrollTag, categoryList])

  const handleCategoryChange = (val) => {
    setActiveId(val)
    dispatch({
      type: productAction.CHANGE_SCROLL_TAG,
      payload: {
        scrollTag: true
      }
    })
  }

  const scrollCategoryChange =(val) => {
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
      let temp2 = []
      categoryList.forEach(item => {
        temp2.push({
          ...item,
          tag: 1
        })
        temp2 = temp2.concat(productList.filter(product => product.catId === item.id))
      })
      setData(temp2)
    }
  }, [categoryList, productList, categoryList.length, productList.length])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data.length > 0) {
        const temp = []
        const dataTemp = data.filter(item => item.tag === 1)
        const firstQuery = Taro.createSelectorQuery()
        console.log('data0--->', dataTemp[0])
        firstQuery.select('#category-' + dataTemp[0].id).fields({
          id: true,
          rect: true,
        }, function (res1) {
          let top = 0
          top = res1.top
          for (let i = 0; i < dataTemp.length; i++) {
            const item = dataTemp[i];
            // temp.push(document.getElementById(item.id).offsetTop);
            (function (obj, index) {
              const query = Taro.createSelectorQuery()
              query.select('#category-' + obj.id).fields({
                id: true,
                rect: true,
              }, function (res) {
                console.log('queryNode--->', res, top)
                temp.push(res.top - top)
                if (index === dataTemp.length - 1) {
                  setOffsetArr(temp)
                  console.log('layouteffect--->', temp)
                }
              }).exec()
            })(item, i);
          }
        }).exec()
      }
    }, 200)
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [data, data.length])

  useEffect(() => {
    if (scrollTag === false) return () => {}
    const index = categoryList.findIndex(item => item.id === activeId)
    if (offsetArr.length > 0) {
      console.log('index--->', offsetArr[index])
      if (Taro.ENV_TYPE.WEAPP === Taro.getEnv()) {
        setScrollTop(offsetArr[index])
      }
      if (ref.current) {
        ref.current.scrollTop = offsetArr[index]
      }
    }
  }, [activeId, offsetArr, categoryList, scrollTag])

  return (
    <View className='categoryList'>
      <ScrollView
        className='leftPart'
        scrollY
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
        id='productList'
        style={{height: otherHeight}}
        scrollWithAnimation
        scrollY
        scrollTop={scrollTop}
        onScroll={handleRightScroll}
        ref={ref}
      >
        {
          data.map(item => {
            if (item.tag === 1) {
              return <View id={'category-' + item.id} key={'product-parent-key-' + item.id} className='productCategoryTitle'>{item.title}</View>
            } else {
              return <ProductItem item={item} key={'product-key-' + item.id} token={token} handleSelectedProductList={handleSelectedProductList} />
            }
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
  const { item, canEdit = true, handleSelectedProductList, token } = props
  const { imgIds, price, title,  stock,  id } = item
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
