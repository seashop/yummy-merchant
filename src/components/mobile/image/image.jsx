import { useEffect, useState } from 'react'
import { Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import path from '../../../utils/path.ts'
import './image.scss'

const MerchantImage = props => {
  const { id, token } = props
  // const [url, setUrl] = useState('')
  // const loadUrl = () => {
  //   Taro.request({
  //     url: APIBasePath + path.mobile.getImgUrl.replace('{id}', id),
  //     method: 'GET',
  //     header: {
  //       Authorization: 'Bearer ' + token,
  //     },
  //     success: (res) => {
  //       console.log('loadImgUrl--->', res)
  //     }
  //   })
  // }
  // useEffect(() => {
  //   // loadUrl()
  // }, [id])
  if (true) {
    return (
      <Image src={APIBasePath + path.mobile.getImgUrl.replace('{id}', id)} className='img' />
    )
  } else {
    return (
      <Image src='https://sea.fly.dev/backend/assets/Group%20647@2x.decd18a6.png' className='img' />
    )
  }
}

export default MerchantImage
