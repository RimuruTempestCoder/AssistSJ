import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import icons from '@/constants/icons';

interface ItemProps {
  title: string;
  description:string
}

const Advices = ({title, description}:ItemProps) => {
  return (
    <TouchableOpacity>
        <View className='w-full h-24 p-2 bg-secondary-200 rounded-full flex flex-row'>
            <View className='rounded-full bg-primary-100 h-full w-20 items-center justify-center'>
                <Image source={icons.notices}></Image>
            </View>
            <View className='p-2 justify-center'>
                <Text className='font-jaldi-bold'>{title}</Text>
                <Text className='font-jaldi'>{description}</Text>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default Advices