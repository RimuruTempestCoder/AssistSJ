import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="font-bold my-10 font-jaldi text-3xl">Welcome to AssistSj</Text>
      <Text>
        <Link href="/welcome">Sign-In</Link>
      </Text>
    </View>
  );
}
