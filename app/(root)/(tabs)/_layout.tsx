import { View, Text } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'

const TabsLayout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarShowLabel:false,
            tabBarStyle:{
                backgroundColor: 'white',
                position:'absolute',
                borderTopColor:'#0061FF1A',
                borderTopWidth:1,
                minHeight:70
            }
        }}

    >
      <Text>_layout</Text>
    </Tabs>
  )
}

export default TabsLayout