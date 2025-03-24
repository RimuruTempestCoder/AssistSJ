import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import icons from '@/constants/icons'
import { Link } from 'expo-router'

interface ItemProps {
    title: string;
  }

const SubHeader = ({title}:ItemProps) => {
  return (
    <View className='flex flex-row pt-10 items-center justify-between'>
      <Link href={{pathname: '/'}}
      asChild>
        <TouchableOpacity>
          <View className='bg-secondary-200 rounded '> 
            <Image source={icons.back} className='size-5' tintColor={'#283370'}></Image>
          </View>
        </TouchableOpacity>
      </Link>
      <Text className='font-jaldi-bold text-primary-200  text-2xl'>{title}</Text>
    </View>
  )
}

export default SubHeader

