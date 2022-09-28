import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'

import { FeedScreen } from './screens/FeedScreen'
import { ImagesScreen } from './screens/ImagesScreen'
import { CameraScreen } from './screens/CameraScreen'

export default function App() {
  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName
            if (route.name === 'Feed') {
              iconName = focused ? 'share-social' : 'share-social-outline'
            } else if (route.name === 'Images') {
              iconName = focused ? 'images' : 'images-outline'
            } else if (route.name === 'Camera') {
              iconName = focused ? 'camera' : 'camera-outline'
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name='Feed' component={FeedScreen} />
        <Tab.Screen name='Images' component={ImagesScreen} />
        <Tab.Screen name='Camera' component={CameraScreen} options={{ unmountOnBlur: true }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
