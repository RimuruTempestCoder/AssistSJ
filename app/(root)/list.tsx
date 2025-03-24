import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SubHeader from '@/components/SubHeader'

interface ItemProps {
  id_grupo: number;
  id_maestro: number;
  id_materia: number;
}

const list = ({id_grupo, id_maestro,id_materia}:ItemProps) => {
  return (
    <SafeAreaView>
        <ScrollView>
            <View>
                <SubHeader title = "Pase de lista"></SubHeader>
            </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default list