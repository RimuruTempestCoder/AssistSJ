import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { useGlobalContext } from '@/lib/global-provider'


const Header = () => {
const {user, refetch} = useGlobalContext();
  return (
    <View className="flex flex-row items-center justify-between mt-5">
        <View className="flex flex-row items-center">
          <Image source={{uri : user?.avatar}} className="rounded-full size-12"/>
          <View className="flex flex-col items-start ml-2 justify-center">
            <Text className="text-s text-primary-100 font-jaldi">Buenos días</Text>
            <Text className="text-primary-200 font-jaldi-bold text-xl">{user?.name}</Text>
          </View>
        </View>
        <Image source={icons.notifications} tintColor={'#283370'} />
      </View>
  )
}

export default Header