import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Settings, ImageSourcePropType } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import { useRouter } from 'expo-router'
import icons from '@/constants/icons'
import { useGlobalContext } from '@/lib/global-provider'
import { logout } from '@/lib/appwrite'
import {settings} from "@/constants/data"
interface SettingsItemProps{
  icon:ImageSourcePropType;
  title:string;
  onPress?:()=>void;
  textStyle?:string;
  showArrow?:boolean; 
}

const SettingsItem = ({icon, title, onPress, textStyle, showArrow = true}:SettingsItemProps) => (
  <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
    <View className='flex flex-row items-center gap-3'>
      <Image source={icon} className='size-4' tintColor='#7B85BC'/>
      <Text className={`text-lg font-jaldi text-primary-100 {textStyle}`}>{title}</Text>
    </View>
    {showArrow && <Image source = {icons.arrow} className='size-3' tintColor='#7B85BC'/>}
  </TouchableOpacity>
)


const profile = () => {
    const router = useRouter();
    const {user, refetch} = useGlobalContext();

    const handleLogout = async()=>{
        const result = await logout();

        if(result){
            Alert.alert("Has cerrado sesion correctamente");
            refetch();
        }else{
            Alert.alert("Hubo un error al cerrar sesion");
        }
    }
  return (
    <SafeAreaView className='h-full bg-secondary-200 bg-white'>
      <ScrollView 
      showsVerticalScrollIndicator = {false}
      contentContainerClassName = 'pb-32 px-7'>

        <View className='flex flex-row item-center justify-between mt-5 bg-white pl-2 pr-2 pt-2 pb-2 rounded-full'>
            <Text className='text-xl font-jalbi-bold text-primary-200'>Perfil</Text>
            <Image source = {icons.notifications} className = 'size-5' tintColor= '#283370'></Image>
        </View>

        <View className='flex-row justify-center flex mt-5'>
            <View className='flex flex-col items-center relative mt-5'>
                <Image source={{uri : user?.avatar}} className='size-44 relative rounded-full'/>
                <Text className='text-2xl font-jaldi-bold mt-2 mb-5 text-primary-200'>{user?.name}</Text>
            </View>
        </View>

        <View className='p-2 bg-white rounded'>
          <View className='flex flex-col '>
            <SettingsItem icon={icons.settings} title='Configuracion'></SettingsItem>
            <SettingsItem icon={icons.profile} title='Informacion Personal'></SettingsItem>
          </View>

          <View className='flex flex-col mt-5 border-t pt-2 border-primary-100'>
          <SettingsItem
            icon={icons.groups}
            title='Usuarios'
            onPress={() => router.push('/(root)/teachers')}
          />
          

          </View>

          <View className='flex flex-col mt-5 border-t pt-5 border-primary-100'>
            <SettingsItem icon={icons.logout} title='Cerrar Sesion' textStyle='text-danger text-red' showArrow={false} onPress={handleLogout}/>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile