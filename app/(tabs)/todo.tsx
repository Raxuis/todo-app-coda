import {ThemedText} from "@/components/ThemedText";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {ScrollView, View} from "react-native";
import {Checkbox, CheckboxIcon, CheckboxIndicator} from "@/components/ui/checkbox";

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
                setTasks((prevTasks: Task[]) => [...prevTasks, ...response.data]);
            })
            .catch((e) => console.error(e))
            .finally(() => setIsLoading(false));
        return (): void => setTasks([]);
    }, []);

    const onToggle = (taskId: string) => {
        setTasks((prevTasks: Task[]) => prevTasks.map((task) => task.id === taskId
            ? {...task, completed: !task.completed} : task
        ));
    }

    return (
        <View className="flex flex-col min-h-screen min-w-screen py-20 px-8 text-black overflow-hidden">
            <ThemedText type="title" className="font-bold">Todo App</ThemedText>
            {isLoading ? (
                <ThemedText>Loading...</ThemedText>
            ) : (
                <ScrollView>
                    {
                        tasks.map((task: Task) => (
                            <View key={task.id} className="flex flex-row items-center gap-2">
                                <View>
                                    <Checkbox value={task.title}
                                              isChecked={task.completed}
                                              onChange={() => onToggle(task.id)}
                                    >
                                    <CheckboxIndicator size="md">
                                            <CheckboxIcon/>
                                        </CheckboxIndicator>
                                    </Checkbox>
                                </View>
                                <ThemedText>{task.title}</ThemedText>
                            </View>
                        ))
                    }
                </ScrollView>
            )}
        </View>
    );
};