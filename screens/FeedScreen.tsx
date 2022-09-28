import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FlatList, Image, StyleSheet } from 'react-native'

export const FeedScreen = () => {
  const [serverImagesUrls, setServerImagesUrls] = useState<string[]>([])

  useEffect(() => {
    ;(async () => {
      const fileUrl = await fetch('https://wildstagram.nausicaa.wilders.dev/list')
      const fileUrlJson = await fileUrl.json()
      setServerImagesUrls(fileUrlJson)
    })()
  }, [])
  return serverImagesUrls.length > 0 ? (
    <FlatList
      data={serverImagesUrls}
      keyExtractor={serverImageURI => serverImageURI}
      renderItem={itemData => {
        console.log('item', itemData)
        return (
          <>
            <Image
              style={styles.image}
              source={{
                uri: 'https://wildstagram.nausicaa.wilders.dev/files/' + itemData.item,
              }}
            />
          </>
        )
      }}
    />
  ) : null
}

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    height: 500,
  },
})
