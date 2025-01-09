import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {useState} from "react";

export default function Todo() {
    return (
        <ThemedView className="flex flex-col min-h-screen min-w-screen pt-20 px-8 text-black overflow-hidden">
            <ThemedText type="title" className="font-bold">
                Todo App
            </ThemedText>
        </ThemedView>
    );
};