import { useGlobalContext } from "@/lib/global-provider";
import { Slot, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

export default function AppLayout() {
    const { loading, isLogged } = useGlobalContext();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isLogged) {
            router.replace("/(root)/welcome");
        }
    }, [loading, isLogged]);

    if (loading) return (
        <SafeAreaView className="bg-white h-full flex justify-center items-center">
            <ActivityIndicator className="text-primary-200" size="large" />
        </SafeAreaView>
    );

    return <Slot />;
}
