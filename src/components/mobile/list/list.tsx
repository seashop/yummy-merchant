import { View, ScrollView } from '@tarojs/components'
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
  id: string,
  num: string,
  time: string,
  type: TypeEnum,
  price: number,
  status: StatusEnum
}

export interface IListProp {
  data: Partial<IListItemProp>[],
  status: StatusEnum
}

const Threshold: number = 15

const List = (props: IListProp) => {
  const { data, status } = props

  return (
    <ScrollView
      className='list'
      scrollY
      scrollWithAnimation
      lowerThreshold={Threshold}
      upperThreshold={Threshold}
    >
      {
        data.map((item: IListItemProp) => {
          return (
            <ListItem {...item} key={item.id} />
          )
        })
      }
    </ScrollView>
  )
}

const ListItem = (props: IListItemProp) => {
  const { num, type, time, price } = props
  let typeName = '堂食'
  if (type === TypeEnum.OUT) {
    typeName = '外带'
  }
  return (
    <View className='listItem'>
      <View className='left'>
        <View className='orderNum'>{num}</View>
        <View className='typeName'>{typeName}</View>
        <View className='orderTime'>{time}</View>
      </View>
      <View className='right'>
        <View className='price'>S$ {price}</View>
        <View className={`btn ${type === TypeEnum.IN ? 'btnIn' : 'btnOut'}`}>确认付款</View>
      </View>
    </View>
  )
}

const ListItemDetail = () => {}

List.defaultProps = {
  data: [],
  status: StatusEnum.NEW
}

export default List
