import { View } from '@tarojs/components'
import { Component } from 'react'
import './step.scss'

interface IStepProps {
  min?: number,
  max?: number,
  value?: number,
  step?: number,
  onChange?: (val: number) => void,
  className?: string,
}

export default class Step extends Component<IStepProps> {
  static defaultProps = {
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
    value: 0,
    step: 1,
  }

  state = {
    current: this.props.value,
    leftDisabled: true,
    rightDisabled: false,
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleLeftClick = () => {
    if (this.state.leftDisabled) return;
    const cur: number = this.state.current! - this.props.step!
    if (cur > this.props.min!) {
      this.setState({current: cur, rightDisabled: false})
    } else {
      this.setState({current: cur, rightDisabled: false, leftDisabled: true})
    }
    this.props.onChange && this.props.onChange(cur);
  }

  handleRightClick = () => {
    if (this.state.rightDisabled) return;
    const cur: number = this.state.current! + this.props.step!
    console.log('+----->', cur);
    if (cur < this.props.max!) {
      this.setState({current: cur, leftDisabled: false})
    } else {
      this.setState({current: cur, leftDisabled: false, rightDisabled: true})
    }
    this.props.onChange && this.props.onChange(cur);
  }

  render () {
    return (
      <div className={`step ${this.props.className}`}>
        <View className={`btn leftBtn ${this.state.leftDisabled ? 'disabled' : ''}`} onClick={this.handleLeftClick}>-</View>
        <View className='text'>{this.state.current}</View>
        <View className={`btn rightBtn ${this.state.rightDisabled ? 'disabled' : ''}`} onClick={this.handleRightClick}>+</View>
      </div>
    )
  }
}


