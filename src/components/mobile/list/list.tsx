import { useState, useEffect } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { formatDate } from '../../../utils/utils'
import path from '../../../utils/path'
import './list.scss'

export enum StatusEnum {
  NEW,
  PAID,
  COMPLATE
}

export enum TypeEnum {
  IN,
  OUT
}

export interface IListItemProp {
  // id: string,
  // num: string,
  // time: string,
  // type: TypeEnum,
  // price: number,
  // status: StatusEnum
  order: object,
  products: any[]
}

export interface IListProp {
  data: any[],
  status: string,
  paymentStatus: string
}

const List = (props: IListProp) => {
  const { data = [], status, paymentStatus } = props
  const [list, setList] = useState([])

  useEffect(() => {
    const temp = data.filter((item: any) => item.order && (item.order.paymentStatus === paymentStatus && item.order.status === status))
    setList([...temp])
  }, [data, status, paymentStatus])

  const updateList = (orderId: string) => {
    const temp = list.filter((item: any) => item.order.id !== orderId)
    setList([...temp])
  }
  console.log('list--->', list, status, paymentStatus)
  return (
    <ScrollView
      className='list'
      scrollY
    >
      {
        list.map((item: any, index: number) => {
          return (
            <ListItem {...item} key={item.key} index={index} updateList={updateList} />
          )
        })
      }
    </ScrollView>
  )
}

const ListItem = (props: any) => {
  
  const { order, products, updateList, index } = props
  const { pickCode, type, createdAt, total, id, paymentStatus, status } = order
  let typeName = '堂食'
  if (type === TypeEnum.OUT) {
    typeName = '外带'
  }
  const time = formatDate(new Date(createdAt), 'MM-dd hh:mm')
  let isMaking = false
  if (index === 0 && paymentStatus === 'STATUS_PAID' && status === 'STAGE_WAIT') {
    isMaking = true
  }
  // if (index === 0) isMaking = true

  const handleClick = () => {
    Taro.showLoading({title: 'loading'})
    try {
      const value1 = Taro.getStorageSync('passport').data
      const innId = value1.inns && value1.inns.length > 0 && value1.inns[0].id
      const value2 = Taro.getStorageSync('token')
      const tokenStr = value2.access
      Taro.request({
        url: APIBasePath + path.mobile.updateOrder.replace('{innId}', innId).replace('{orderId}', id),
        method: 'PATCH',
        data: {
          type: paymentStatus === 'STATUS_UNPAID' ? 'TYPE_PAID' : 'TYPE_MADE'
        },
        header: {
          Authorization: 'Bearer ' + tokenStr,
        },
        success: (res: any) => {
          console.log('updateOrder success--->', res)
          if (res.statusCode === 200) {
            updateList(id)
          } else {
            Taro.showToast({
              title: '更新订单失败',
              icon: 'error',
              duration: 2000
            })
          }
          Taro.hideLoading()
        },
        fail: (error: any) => {
          console.log('updateOrder error--->', error)
          Taro.hideLoading()
        }
      })
    } catch (error) {
      console.log('updateOrder error--->', error)
      Taro.hideLoading()
    }
  }

  if (!isMaking) {
    return (
      <View className='listItem'>
        <View className='left'>
          <View className='orderNum'>{pickCode}</View>
          <View className='typeName'>{typeName}</View>
          <View className='orderTime'>{time}</View>
        </View>
        <View className='right'>
          <View className='price'>S$ {total}</View>
          {
            status !== 'STAGE_DONE' && <View className={`btn ${type === TypeEnum.IN ? 'btnOut' : 'btnIn'}`} onClick={handleClick}>
            {paymentStatus === 'STATUS_UNPAID' ? '确认付款' : '备餐完成'}</View>
          }
        </View>
      </View>
    )
  } else {
    return (
      <View className='makingListItem'>
        <View className='makingListItemContent'>
          <View className='orderDetail'>
            <View className='left'>
              <View className='orderNum'>{pickCode}</View>
              <View className='typeName'>{typeName}</View>
            </View>
            <View className='price'>S$ {total}</View>
          </View>
          <View className='productDetail'>
            {
              products.length > 0 && products.map((item: any) => {
                return (
                  <View className='productItem' key={'orderId-' + id + 'productId-' + item.id}>
                    <View className='productName'>{item.productTitle}</View>
                    <View className='productNum'>x {item.quantity}</View>
                  </View>
                )
              })
            }
            {
              products.length === 0 && <View className='noData'>没有餐品数据</View>
            }
          </View>
        </View>
        <View className='makingBtn' onClick={handleClick}>备餐完成</View>
      </View>
    )
  }
}

const ListItemDetail = () => {}

List.defaultProps = {
  data: [],
  status: StatusEnum.NEW
}

export default List
