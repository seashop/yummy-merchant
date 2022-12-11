import { Component } from 'react'
import { View, ScrollView, Text } from '@tarojs/components'
import { AtAvatar, AtDivider } from 'taro-ui'
import Step from '../../../../components/step/step'
import './category.scss'

interface IRightListProps {
  height: number,
  updateActiveIndex: (val: string) => void
}

const Threshold: number = 15

const categoryLengthArr = [5, 5];
const heightList = categoryLengthArr.map((item: number) => {
  return 50 + Math.ceil(item / 2) * 362;
})
const offsetHeightList = heightList.map((item: number, index: number) => {
  return heightList.slice(0, index + 1).reduce((total: number, cur: number) => {
    return total + cur
  }, 0);
})

console.log('offsetHeightList--->', offsetHeightList);

export default class RightList extends Component<IRightListProps> {

  state = {
    list: [],
  }

  componentWillMount () { }

  componentDidMount () {
    // const temp = [];
    // for (let i = 0; i < 20; i++) {
    //   temp.push({
    //     id: i + '',
    //     title: 'MARTINI PROSECCO SPARKLING 11.5% ~',
    //     imgsrc: 'https://yummy-1251018873.cos.ap-singapore.myqcloud…o/public/uploads/images/202210/6348085a0213d.jpeg',
    //     tags: ['热门'],
    //     price: 30,
    //     discountPrice: 25.99,
    //     stock: 99999,
    //     zan: 10,
    //     buyCount: 0,
    //   })
    // }
    
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleScroll = (e: any) => {
    for(let i = 0; i < offsetHeightList.length; i++) {
      if (e.detail.scrollTop < offsetHeightList[i]) {
        this.props.updateActiveIndex((i + 1) + '')
        break;
      }
    }
  }

  render () {
    return (
      <ScrollView
        className='rightlist'
        style={{height: this.props.height}}
        scrollY
        scrollWithAnimation
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
        onScroll={this.handleScroll}
      >
        <AtDivider content='分类1' className='categoryDivider category-class-1' />
        {
          [1, 2, 3, 4, 5].map((item: number) => {
            return (
              <ProductDetail key={item} />
            )
          })
        }
        <AtDivider content='分类2' className='categoryDivider category-class-2' />
        {
          [6, 7, 8, 9, 10].map((item: number) => {
            return (
              <ProductDetail key={item} />
            )
          })
        }
      </ScrollView>
    )
  }
}

enum ProductStatus {
  Normal,
  Empty,
}

interface IProductDetailProp {
  id: string,
  imgsrc: string,
  buyCount: number,
  price: number,
  discountPrice: number,
  stock: number,
  zan?: number,
  tags: string[],
  status: ProductStatus,
  title: string,
}

class ProductDetail extends Component<Partial<IProductDetailProp>> {
  static defaultProps = {
    title: 'MARTINI PROSECCO SPARKLING 11.5% ~',
    imgsrc: 'https://sea.fly.dev/backend/assets/Group%20647@2x.decd18a6.png',
    tags: ['热门'],
    stock: 99999,
    buyCount: 0,
  }
  state = {
    count: this.props.buyCount,
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleBuyCountChange = (val: number) => {
    this.setState({
      count: val,
    })
  }

  render () {
    return (
      <View className={`productDetail ${this.state.count! > 0 ? 'active' : ''}`}>
        <AtAvatar className='img' image={this.props.imgsrc} />
        <Text className='title'>{this.props.title}</Text>
        <View className='tagGroup'>
          {
            this.props.tags!.map((tag: string) => <View className='tag' key={tag}>{tag}</View>)
          }
        </View>
        {/* <AtInputNumber
          className='buyCount'
          type='number'
          min={0}
          max={this.props.stock}
          step={1}
          value={this.state.count as number}
          onChange={this.handleBuyCountChange}
        /> */}
        <Step
          className='buyCount'
          min={0}
          max={this.props.stock}
          step={1}
          value={this.state.count as number}
          onChange={this.handleBuyCountChange}
        />
        <View className='countDetail'>
          <View className='countDetailLeft'>
            <View className='at-icon at-icon-shopping-cart stock'>
              99999
            </View>
            <View className='at-icon at-icon-eye zan'>10</View>
          </View>
          <View className='countDetailRight'>
            <View className='price'>$30.00</View>
            <View className='discountPrice'>$25.99</View>
          </View>
        </View>
      </View>
    )
  }
}
