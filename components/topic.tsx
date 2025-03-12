import { View, Text, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import React from 'react';

interface ItemProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
}

const Topic = ({ icon, title, onPress }: ItemProps) => {
  return (
    <TouchableOpacity 
      className="w-32 h-40 rounded-lg items-center" onPress={onPress}>
      <View className="w-full h-full flex flex-col items-center justify-center gap-3 p-5 bg-secondary-200">
        <Image source={icon} resizeMode="contain" />
        <Text className="font-jaldi text-center">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Topic;
