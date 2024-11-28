import { View, Text } from 'react-native'
import React from 'react'
import LocationSection from './LocationSection'
import SearchBar from './SearchBar'


const HeaderSection = () => {
  return (
    <View>
      
      <LocationSection />
      <SearchBar />
    </View>
  )
}

export default HeaderSection