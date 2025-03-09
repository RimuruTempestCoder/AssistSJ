import { Link } from "expo-router";
import { Text, View } from "react-native";
import { useGlobalContext } from '@/lib/global-provider'
import { Redirect } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import images from "@/constants/images"
import icons from "@/constants/icons";

export default function Index() {
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
      </SafeAreaView>
  );
}
