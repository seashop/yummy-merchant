import { useState, useEffect, useMemo } from 'react'
import { View, ScrollView, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { formatDate } from '../../../utils/utils'
import path from '../../../utils/path'
import './list.scss'
import successImg from '../../../assets/imgs/success.png'
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
  loadOrderList: Function
}

const List = (props: IListProp) => {
  const { data = [], status, paymentStatus } = props
  const [list, setList] = useState({})

  useEffect(() => {
    const temp = data.filter((item: any) => item.order && (item.order.paymentStatus === paymentStatus && item.order.status === status))
    // 按日期进行数据整理
    const timeMap = {}
    for (let item of temp) {
      let time = formatDate(new Date(item.order.createdAt), 'yyyy-MM-dd')
      if (timeMap[time]) {
        timeMap[time].push(item)
      } else {
        timeMap[time] = [item]
      }
    }
    // const time = formatDate(new Date(createdAt), 'MM-dd hh:mm')
    setList({...timeMap})
  }, [data, status, paymentStatus])


  const filterList = useMemo(() => {
    const temp = data.filter((item: any) => item.order && (item.order.paymentStatus === paymentStatus && item.order.status === status))
    return temp
  }, [data, status, paymentStatus])

  const updateList = () => {
    // list[date] = list[date].filter((item: any) => item.order.id !== orderId)
    // setList({...list})
    // 重新请求列表
    props.loadOrderList(status)
  }
  console.log('list--->', list, status, paymentStatus)

  if (status === 'STAGE_WAIT') {
    return (
      <ScrollView
        className='list'
        scrollY
      >
        <p className='stage_wait_num'>当前您还有{filterList.length}笔订单</p>
        {
          <>
            {filterList.map((item: any, index: number) => {
              return (
                <ListItem {...item} key={item.key} index={index} updateList={updateList} />
              )
            })}
          </>
        }
      </ScrollView>
    )
  } else {
    // 待付款、已完成 根据日期排
    return (
      <ScrollView
        className='list'
        scrollY
      >
        {
          Object.keys(list).map((date) => {
            return (
              <>
                {status !== 'STAGE_WAIT' && list[date].length > 0 && <p className='date'>{date}</p>}
                {list[date].map((item: any, index: number) => {
                  return (
                    <ListItem date={date} {...item} key={item.key} index={index} updateList={updateList} />
                  )
                })}
              </>
            )
          })
        }
      </ScrollView>
    )
  }
}

const ListItem = (props: any) => {
  const { order, products, updateList, index, date } = props
  const { pickCode, type, createdAt, total, id, paymentStatus, status, needPack } = order
  let typeName = '堂食'
  if (needPack) {
    typeName = '外带'
  }
  const time = formatDate(new Date(createdAt), 'hh:mm:ss')
  let isMaking = false
  if (index === 0 && paymentStatus === 'STATUS_PAID' && status === 'STAGE_WAIT') {
    isMaking = true
  }
  // if (index === 0) isMaking = true

  const handleClick = () => {
    Taro.showModal({
      title: '提示',
      content: paymentStatus === 'STATUS_UNPAID' ? '确认收款？' : '确认备餐？',
      success: function (res) {
        if (res.confirm) {
          Taro.showLoading({title: '请稍等'})
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
                  updateList(date, id)
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
        } else if (res.cancel) {
        }
      }
    })

  }

  if (!isMaking) {
    return (
      <View className='listItem'>
        <View className='left'>
          <View className='orderNum'>{pickCode}</View>
          <View className={`typeName  ${needPack ? 'typeOut' : 'typeIn'}`}>{typeName}</View>
          <View className='orderTime'>{time}</View>
        </View>
        <View className='right'>
          <View className='price'>S$ {total}</View>
          {
            status !== 'STAGE_DONE' && <View className={`btn ${needPack ? 'btnOut' : 'btnIn'}`} onClick={handleClick}>
            {paymentStatus === 'STATUS_UNPAID' ? '确认付款' : '备餐完成'}</View>
          }
          {status === 'STAGE_DONE' && <Image src={successImg} className='success-img'/>}
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
