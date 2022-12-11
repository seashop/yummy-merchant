import { View, Picker } from '@tarojs/components'
import { AtTextarea } from 'taro-ui'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import './orderDetail.scss'
import OrderItem from './orderItem'

const MAX_PEOPLE_COUNT = 8

const TableDetail = () => {
  const peopleCount = useSelector((state: any) => {
    console.log('state--->', state)
    return state.productReducer.peopleCount
  })
  const [count, setCount] = useState(peopleCount)
  const [remark, setRemark] = useState('')
  const peopleCountOptions = Array(MAX_PEOPLE_COUNT).fill('').map((_item: string, index: number) => {
    return {
      value: index + 1,
      name: '人数 ' + (index + 1) + '/' + MAX_PEOPLE_COUNT
    }
  })
  const handlePeopleCountChange = (e: any) => {
    console.log('handlePeopleCountChange--->', e.detail.value)
    setCount(Number(e.detail.value) + 1)
  }
  const handleTextAreaChange = (val: string) => {
    setRemark(val)
  }
  return (
    <View className='tableDetail'>
      <View className='part1'>
        <View className='part1Left'>
          <View>2-01</View>
          <View className='orderTime'>Order Time: 09:30</View>
        </View>
        <View className='part1Right'>
          <Picker mode='selector' range={peopleCountOptions} rangeKey='name' onChange={handlePeopleCountChange}>
            <View className='peopleCount'>用餐人数: {peopleCountOptions[count - 1].name}</View>
          </Picker>
        </View>
      </View>
      <View className='part2'>
        <View className='btn printBtn'>打印小票</View>
        <View className='btn moreBtn'>更多</View>
      </View>
      <View className='part3'>
        <View className='list'>
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </View>
      </View>
      <View className='part4'>
        <AtTextarea className='remark' value={remark} onChange={handleTextAreaChange}
          placeholder='请输入备注信息' count={false} height={60} fixed
        />
        <View className='totalPricePart'>
          <View className='totalPrice'>$ 110.23</View>
          <View className='orderBtn'>下单</View>
        </View>
        <View className='lastBtn'>结算</View>
      </View>
    </View>
  )
}

export default TableDetail
