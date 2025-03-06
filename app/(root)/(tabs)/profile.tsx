import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'

const profile = () => {

    const handleLogout = async()=>{

    }
  return (
    <SafeAreaView className='h-full bg-white'>
      <ScrollView 
      showsVerticalScrollIndicator = {false}
      contentContainerClassName = 'pb-32 px-7'>

        <View className='flex flex-row item-center justify-between mt-5'>
            <Text className='text-xl font-jalbi-bold text-primary-200'>Perfil</Text>
            <Image source = {icons.notifications} className = 'size-5' tintColor= '#283370'></Image>
        </View>

        <View className='flex-row justify-center flex mt-5'>
            <View className='flex flex-col items-center relative mt-5'>

                <Image source={images.avatar} className='size-44 relative rounded-full'/>

            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default profile