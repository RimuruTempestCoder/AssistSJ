import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator } from "react-native";

export default function AppLayout() {
    const {loading, isLogged} = useGlobalContext();

    if(loading) return (
        <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className = "text-primary-200" size = "large"/>
        </SafeAreaView>
    )
    
    if(!isLogged) return <Redirect href="/welcome"/>

    return <Slot/>
}