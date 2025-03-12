import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import images from "@/constants/images"
import icons from "@/constants/icons";
import Topic from "@/components/topic"
import Header from "@/components/Header";

export default function Index() {
  return (
    <SafeAreaView className="bg-white">
    <View className="px-5">
    <Header/>
  
      <View className="w-full items-center mt-2">
        <Image source={images.main} className="rounded w-full h-80 mt-3 mb-3" />
      </View>
  
      <View className="w-full flex flex-row justify-between mt-2">
        <Topic icon={icons.groups} title="Crear Grupos"/>
        <Topic icon={icons.calendar} title="Cronograma"/>
        <Topic icon={icons.subjects} title="Crear Materias"/>
      </View>

      <View className="mt-5">
        <Text className="text-xl text-primary-200 font-jaldi-bold">Avisos</Text>
        <View></View>
      </View>
    </View>
  </SafeAreaView>
  
  );
}
