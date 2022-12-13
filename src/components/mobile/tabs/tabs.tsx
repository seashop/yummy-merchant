import { View } from '@tarojs/components'
import './tabs.scss'

export interface ITabListItem {
  index: number,
  title: string,
}

export interface ITabsProp {
  current: number,
  tabList: ITabListItem[],
  onChange: (cur: number) => void,
  className: string,
}

const Tabs = (props: ITabsProp) => {
  const { current, tabList, onChange, className } = props;

  const handleClick = (cur: number) => {
    onChange(cur)
  }

  return (
    <View className='tabs'>
      <View className='tabsHead'>
        {
          tabList.map((item: ITabListItem) => {
            return (
              <View
                key={'tab-list-item-key-' + item.title}
                onClick={() => handleClick(item.index)}
                className={`headItem ${className} ${current === item.index ? 'active' : ''}`}
              >{item.title}</View>
            )
          })
        }
      </View>
    </View>
  )
}

Tabs.defaultProps = {
  current: 0,
  tabList: [],
  onChange: () => {},
  className: ''
}

export default Tabs;
