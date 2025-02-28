import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const SplashScreen : FC = () => {
  return (
    <SafeAreaView>
      <View>
      <Text>SplashScreen</Text>
    </View>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})