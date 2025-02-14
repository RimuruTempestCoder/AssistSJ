import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const group = () => {
    const { id } = useLocalSearchParams();
  return (
    <View>
      <Text>group</Text>
    </View>
  )
}

export default group