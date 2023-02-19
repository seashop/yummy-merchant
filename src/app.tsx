import { Component, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import './app.scss'

class App extends Component<PropsWithChildren> {

  componentDidMount () {
    console.debug({
      GitHash: process.env.GIT_HASH,
      BuildDate: process.env.BUILD_DATE
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return (
      <Provider store={store}>
        {
          this.props.children
        }
      </Provider>
    )
  }
}

export default App
