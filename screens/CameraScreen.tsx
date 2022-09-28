import React, { useEffect, useState, useRef } from 'react'
import * as ImageManipulator from 'expo-image-manipulator'
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Camera, CameraType } from 'expo-camera'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

export const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back)
  const [permission, setPermission] = useState(null)
  const cameraRef = useRef(null)

  const toggleCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back)
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setPermission(status === 'granted')
    })()
  }, [])

  if (permission === null) {
    return <View />
  }
  if (permission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} type={type} />
      <View style={styles.flipButtonContainer}>
        <TouchableOpacity onPress={toggleCameraType}>
          <Ionicons name='md-camera-reverse-outline' size={24} color='tomato' />
        </TouchableOpacity>
      </View>
      <Pressable
        style={styles.takePictureButton}
        onPress={async () => {
          const pictureMetadata = await cameraRef.current.takePictureAsync()
          console.log(pictureMetadata)
          console.log(await ImageManipulator.manipulateAsync(pictureMetadata.uri, [{ resize: { width: 800 } }]))
        }}
        accessibilityLabel='Take a picture'
      >
        <MaterialIcons name='camera' size={48} color='tomato' />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipButtonContainer: {
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    margin: 20,
  },
  takePictureButton: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    margin: 20,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
})
