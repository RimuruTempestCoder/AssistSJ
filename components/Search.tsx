import { View, Text, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router, useLocalSearchParams, usePathname } from 'expo-router'
import icons from '@/constants/icons';
import {useDebouncedCallback} from 'use-debounce'

const Search = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{query?:string}>();
    const [search, setSearch] = useState(params.query);
    const debouncedSearch = useDebouncedCallback((text:string) => router.setParams({query:text}),500)

    const handleSearch = (text:string) => {
        setSearch(text);
        debouncedSearch(text);
    }

    return (
        <View className='flex flex-row items-center justify-between w-full px-4 rounded-full bg-secondary-100 border border-primary-100 mt-5 py-2'>
        <View className='flex-1 flex flex-row items-center justify-start z-50 '>
            <Image source={icons.search} tintColor={'#7B85BC'} className='size-5'></Image>
            <TextInput value={search} onChangeText={handleSearch} placeholder='¿Que deseas buscar?' className='text-sm font-jaldi text-primary-100 ml-2 flex-1'/>
        </View>
        </View>
    )
}

export default Search