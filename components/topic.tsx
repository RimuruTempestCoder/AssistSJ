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
      className="w-32 h-40  items-center" onPress={onPress}>
      <View className="w-full h-full flex flex-col items-center justify-center gap-3 p-5 bg-secondary-200 rounded-lg">
        <Image source={icon} resizeMode="contain" />
        <Text className="font-jaldi text-center text-primary-200">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Topic;
