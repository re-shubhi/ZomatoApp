import { View, Text } from 'react-native'
import React, { FC } from 'react'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'

const CustomTabBar : FC <BottomTabBarProps>= (props) => {
  return (
    <View>
      <Text>CustomTabBar</Text>
    </View>
  )
}

export default CustomTabBar