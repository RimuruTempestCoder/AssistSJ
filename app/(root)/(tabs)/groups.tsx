import { View, Text, Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { SafeAreaView } from 'react-native-safe-area-context'
import Search from '@/components/Search'

const groups = () => {
  return (
    <SafeAreaView className="bg-white">
        <View className="px-5">
          <View className="flex flex-row items-center justify-between mt-5">
            <View className="flex flex-row items-center">
              <Image source={images.avatar} className="rounded-full size-12"/>
              <View className="flex flex-col items-start ml-2 justify-center">
                <Text className="text-s text-primary-100 font-jaldi">Buenos dias</Text>
                <Text className="text-primary-200 font-jaldi-bold text-xl">Beto Tempest</Text>
              </View>
            </View>
            <Image source={icons.notifications} tintColor={'#283370'}></Image>
          </View>
        </View>
        <Search/>
      </SafeAreaView>
  )
}

export default groups