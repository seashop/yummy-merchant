import { Component } from 'react'
import { View, ScrollView, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import Taro from '@tarojs/taro'
import './category.scss'


interface ILeftListProps {
  height: number,
  activeIndex: string,
}

const Threshold: number = 15

export default class LeftList extends Component<ILeftListProps> {

  state = {
    list: [
      {
        id: '1',
        name: 'category-1',
        imgsrc: 'https://sea.fly.dev/backend/assets/Group%20647@2x.decd18a6.png',
        active: false,
      },
      {
        id: '2',
        name: 'category-2',
        imgsrc: 'https://sea.fly.dev/backend/assets/Group%20647@2x.decd18a6.png',
        active: false,
      },
      {
        id: '3',
        name: 'category-3',
        imgsrc: 'https://sea.fly.dev/backend/assets/Group%20647@2x.decd18a6.png',
        active: false,
      },
      {
        id: '4',
        name: 'category-4',
        imgsrc: 'https://sea.fly.dev/backend/assets/Group%20647@2x.decd18a6.png',
        active: false,
      },
      {
        id: '5',
        name: 'category-5',
        imgsrc: 'https://sea.fly.dev/backend/assets/Group%20647@2x.decd18a6.png',
        active: false,
      },
      {
        id: '6',
        name: 'category-6',
        imgsrc: 'https://sea.fly.dev/backend/assets/Group%20647@2x.decd18a6.png',
        active: false,
      }
    ],
    currentCategoryId: this.props.activeIndex,
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  // eslint-disable-next-line react/sort-comp
  componentWillReceiveProps(nextProps: Readonly<ILeftListProps>): void {
    if (nextProps.activeIndex !== this.props.activeIndex) {
      this.setState({currentCategoryId: nextProps.activeIndex})
    }
  }

  handleChangeActive = (categoryId: string | number) => {
    this.setState({currentCategoryId: categoryId});
    if (Taro.getEnv() === 'WEB') {
      document.querySelector('.category-class-' + categoryId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'start',
      });
    } else {
      Taro.pageScrollTo({
        selector: '.category-class-' + categoryId,
        duration: 300,
        offsetTop: 100,
        fail: (error: any) => {
          console.log('pageScrollTo error--->', error);
        }
      });
    }
  }

  render () {
    return (
      <ScrollView
        className='leftlist'
        style={{height: this.props.height}}
        scrollY
        scrollWithAnimation
        lowerThreshold={Threshold}
        upperThreshold={Threshold}
      >
        {
          this.state.list.map((item: ILeftListItemProp) => {
            return (
              <LeftListItem {...item} key={item.id} active={this.state.currentCategoryId === item.id} changeActive={this.handleChangeActive} />
            )
          })
        }
      </ScrollView>
    )
  }
}

interface ILeftListItemProp {
  id: string,
  imgsrc: string,
  active: boolean,
  name: string,
  changeActive: (categoryId: string | number) => void,
}

class LeftListItem extends Component<ILeftListItemProp> {
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className={`leftlistitem ${this.props.active ? 'active' : ''}`} onClick={() => this.props.changeActive(this.props.id)}>
        <AtAvatar className='img' image={this.props.imgsrc} />
        <Text className='text'>{this.props.name}</Text>
      </View>
    )
  }
}
