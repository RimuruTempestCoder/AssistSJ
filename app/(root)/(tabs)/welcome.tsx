import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import {login} from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'

const welcome = () => {
    const {refetch, loading, isLogged} = useGlobalContext();

    if(!loading && isLogged) return <Redirect href = "/"></Redirect>

    const handleStart = async()=>{
        const result = await login();

        if(result){
            refetch();
        }else{
            Alert.alert("Fallo al iniciar sesion");
        }
    };
  return (
    <SafeAreaView className='h-full bg-secondary-200'>
        <ScrollView contentContainerClassName='h-full'>
            <Image source={icons.decoration} className='' resizeMode='contain'></Image>
            <Text className='font-jaldi-bold text-6xl text-center pt-5 text-primary-200 '>AssistSJ</Text>
            <Image source={images.start} className='w-full h-2/6' resizeMode='contain'></Image>
            <View className='px-5'>
                <Text className='text-base text-center uppercase font-jaldi-bold text-primary-200 text-2xl pt-2'>Pasar lista jamas fue mas sencillo</Text>
                <TouchableOpacity onPress={handleStart} className='w-full bg-primary-200 shadow-md shadow-primary-200 rounded-full h-20 py-4 mt-5'>
                    <View className='flex-1 items-center justify-center'>
                        <Text className='text-secondary-100 text-center font-jaldi text-xl '>Empecemos</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleStart} className='w-full bg-secondary-100 shadow-md shadow-primary-200 rounded-full h-20 py-4 mt-5'>
                    <View className='flex-1 items-center justify-center'>
                        <Text className='text-primary-200 text-center font-jaldi text-xl '>Importar Datos</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default welcome