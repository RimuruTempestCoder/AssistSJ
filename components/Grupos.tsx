import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
import { Link } from 'expo-router';

interface ItemProps {
  id: number;
  id_maestro: number;
  nombre: string;
}

const Grupos = ({ id, id_maestro, nombre }: ItemProps) => {
  return (
    
    <Link 
      href={{ 
        pathname: '/(root)/subjects', 
        params: { 
          id_grupo: String(id), 
          id_maestro: String(id_maestro) 
        } 
      }}
      asChild
    >

      <TouchableOpacity>
        <View className='flex flex-col p-2 mr-5 ml-5 m-2'>
          <View className='w-full h-20 bg-secondary-200 rounded-full flex flex-row'>
            <Image source={icons.groups} className='size-12 m-4' resizeMode='contain' />
            <View className='justify-center flex-col'>
              <Text className='text-xl font-jaldi text-primary-100'>Grupo:</Text>
              <Text className='text-xl font-jaldi-bold text-primary-200'>{nombre}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
    
  );
};

export default Grupos;
