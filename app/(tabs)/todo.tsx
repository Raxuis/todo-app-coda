import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {useEffect, useState} from "react";
import axios from "axios";
import {Animated, ScrollView} from "react-native";

type Task = {
    userId: string;
    id: string;
    title: string;
    completed: boolean;
}

export default function Todo() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/todos")
            .then((response) => {
                setTasks((prevTasks) => [...prevTasks, ...response.data]);
            })
            .catch((e) => console.error(e))
            .finally(() => setIsLoading(false));
    }, []);
    return (
        <ScrollView className="flex flex-col min-h-screen min-w-screen pt-20 px-8 text-black overflow-hidden">
            <ThemedText type="title" className="font-bold">Todo App</ThemedText>
            {isLoading ? (
                <ThemedText>Loading...</ThemedText>
            ) : (
                tasks.map((task:Task) => (
                    <ThemedText key={task.id} className="mt-2">
                        {task.title}
                    </ThemedText>
                ))
            )}
        </ScrollView>
    );
};