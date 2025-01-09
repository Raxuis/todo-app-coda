import {ThemedText} from "@/components/ThemedText";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {ScrollView, View} from "react-native";
import {Checkbox, CheckboxIcon, CheckboxIndicator} from "@/components/ui/checkbox";
import {Button} from "@/components/ui/button";
import {ArchiveXIcon, CheckIcon} from "lucide-react-native";
import {Icon} from "@/components/ui/icon";

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

    const deleteTask = (id: string) => {
        setTasks((prevTasks: Task[]) => prevTasks.filter((task) => task.id !== id))
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
                            <View key={task.id} className="flex flex-row items-center justify-between">
                                <View>
                                    <Checkbox value={task.title}
                                              isChecked={task.completed}
                                              onChange={() => onToggle(task.id)}
                                    >
                                        <CheckboxIndicator size="md">
                                            <CheckboxIcon as={CheckIcon}/>
                                        </CheckboxIndicator>
                                    </Checkbox>
                                </View>
                                <ThemedText className="w-3/4 mx-auto">{task.title}</ThemedText>
                                <Button onPress={() => deleteTask(task.id)} variant="outline" className="border-0 p-0">
                                    <Icon as={ArchiveXIcon} className="text-red-500"/>
                                </Button>
                            </View>
                        ))
                    }
                </ScrollView>
            )}
        </View>
    );
};