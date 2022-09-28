import React, { useEffect, useState } from 'react'
import * as FileSystem from 'expo-file-system'
import { Image, StyleSheet, FlatList, Button } from 'react-native'
import singleFileUploader from 'single-file-uploader'
import Constants from 'expo-constants'

export const ImagesScreen = () => {
  const [imagesURI, setImagesURI] = useState([])

  useEffect(() => {
    ;(async () => {
      const images = await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory + 'ImageManipulator')
      setImagesURI(images)
    })()
  }, [])

  return imagesURI.length > 0 ? (
    <FlatList
      data={imagesURI}
      keyExtractor={imagesURI => imagesURI}
      renderItem={itemData => {
        return (
          <>
            <Image
              style={styles.images}
              source={{
                uri: FileSystem.cacheDirectory + 'ImageManipulator/' + itemData.item,
              }}
            />
            <Button
              title='upload'
              onPress={async () => {
                try {
                  await singleFileUploader({
                    distantUrl: 'https://wildstagram.nausicaa.wilders.dev/upload',
                    expectedStatusCode: (201).toString(),
                    filename: itemData.item,
                    filetype: 'image/jpg',
                    formDataName: 'fileData',
                    localUri: FileSystem.cacheDirectory + 'ImageManipulator/' + itemData.item,
                    token: Constants.manifest.extra.token,
                  })
                  alert('Uploaded')
                } catch (err) {
                  alert(`Error: ${err}`)
                }
              }}
            />
          </>
        )
      }}
    />
  ) : null
}

const styles = StyleSheet.create({
  images: {
    resizeMode: 'cover',
    height: 500,
  },
})
