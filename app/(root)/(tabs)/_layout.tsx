import { View, Text, Image } from 'react-native'
import React from 'react'
import {Tabs} from 'expo-router'
import icons from '@/constants/icons'


const TabIcon = ({focused , icon, title}: {focused:boolean, icon:any, title: string})=>(
  <View className='flex-1 mt-3 flex flex-col items-center'>
    <Image source={icon} tintColor={focused ? '#283370' : '#7B85BC'} resizeMode='contain' className='size-6'/>
    <Text className={`${focused ? 'text-primary-200 font-jaldi' : 'text-primary-100 font-jaldi-bold'} text-xs w-full text-center mt-1`}>{title}</Text>
  </View>
)

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
      <Tabs.Screen
        name = 'index'
        options = {{
          title:'Home',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon icon={icons.home} focused = {focused} title='Inicio'/>
          )
        }}
        />

      <Tabs.Screen
        name = 'groups'
        options = {{
          title:'Grupos',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon icon={icons.groups} focused = {focused} title='Grupos'/>
          )
        }}
        />

      <Tabs.Screen
        name = 'activities'
        options = {{
          title:'Cronograma',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon icon={icons.calendar} focused = {focused} title='Cronograma'/>
          )
        }}
        />

      <Tabs.Screen
        name = 'profile'
        options = {{
          title:'Perfil',
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <TabIcon icon={icons.profile} focused = {focused} title='Perfil'/>
          )
        }}
        />

        
    </Tabs>
  )
}

export default TabsLayout