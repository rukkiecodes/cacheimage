import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'

import shorthash from 'shorthash'
import * as FileSystem from 'expo-file-system'

const CacheImage = (props) => {
  const { url, style, width, resizeMode, type } = props
  const [uri, setUri] = useState(null)

  useEffect(() => {
    Cached()
  }, [])

  const Cached = async () => {
    const name = shorthash.unique(url)

    const path = `${FileSystem.cacheDirectory}${name}`

    const image = await FileSystem.getInfoAsync(path)

    if (image.exists) {
      setUri(image.uri)
      return
    }

    const newImage = await FileSystem.downloadAsync(uri, path)
    setUri(newImage.uri)
  }
  return (
    <>
      {
        type == 'image' && <Image style={style} width={400 || width} resizeMode={'contain' || resizeMode} source={{ uri: 'https://via.placeholder.com/350x150' || url }} />
      }
      {
        type == 'autoHeight' && <AutoHeightImage style={style} width={400 || width} resizeMode={'contain' || resizeMode} source={{ uri: 'https://via.placeholder.com/350x150' || url }} />
      }
    </>
  )
}

export default CacheImage
