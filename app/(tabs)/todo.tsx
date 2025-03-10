import React, {useCallback, useEffect, useState} from "react";
import {RefreshControl, ScrollView, Text, View} from "react-native";
import {Checkbox, CheckboxIcon, CheckboxIndicator} from "@/components/ui/checkbox";
import {Button, ButtonText} from "@/components/ui/button";
import {ArchiveXIcon, CheckIcon} from "lucide-react-native";
import {Icon} from "@/components/ui/icon";
import {AsyncStorageService} from "@/services/AsyncStorageService";
import AddTaskModal from "@/components/AddTaskModal";
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {Spinner} from "@/components/ui/spinner";
import DeleteTaskModal from "@/components/DeleteTaskModal";
import {cn} from "@/lib/utils";
import {ThemedText} from "@/components/ThemedText";

export type Task = {
    userId: string;
    id: string;
    title: string;
    completed: boolean;
};

export default function Todo() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModal2, setShowModal2] = useState<boolean>(false);
    const [taskIdToDelete, setTaskIdToDelete] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchTasks = async () => {
        setIsFetching(true);
        try {
            const asyncStorageTasks: Task[] = await AsyncStorageService.getAsyncStorageValue("tasks");
            setTasks(asyncStorageTasks || []);
        } finally {
            setIsFetching(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchTasks();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        fetchTasks();
    }, []);

    const saveTasksToAsyncStorage = async (updatedTasks: Task[]) => {
        await AsyncStorageService.setAsyncStorage("tasks", updatedTasks);
    };

    const toggleCompleted = async (taskId: string) => {
        const updatedTasks = tasks.map((task) =>
            task.id === taskId ? {...task, completed: !task.completed} : task
        );
        setTasks(updatedTasks);
        saveTasksToAsyncStorage(updatedTasks).catch(console.error);
    };

    const deleteTask = async (id: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        saveTasksToAsyncStorage(updatedTasks).catch(console.error);
    };

    const addTask = async (taskText: string) => {
        const taskId: string = uuidv4();
        const newTask: Task = {
            userId: "0",
            id: taskId,
            completed: false,
            title: taskText,
        };
        const updatedTasks = [newTask, ...tasks];
        setTasks(updatedTasks);
        saveTasksToAsyncStorage(updatedTasks).catch(console.error);
    };

    return (
        <View className="flex flex-col min-h-screen min-w-screen pt-20 text-black overflow-hidden">
            <View className="flex flex-row w-full justify-between py-2 px-8">
                <ThemedText type="title" className="font-bold">Todo App</ThemedText>
                <Button variant="solid" onPress={() => setShowModal(true)}>
                    <ButtonText>Ajouter tâche</ButtonText>
                </Button>
            </View>
            {isFetching ? (
                <View className="inline-flex flex-row items-center px-8 gap-2">
                    <Spinner />
                    <ThemedText>Loading...</ThemedText>
                </View>
            ) : (
                <ScrollView
                    className="mb-40"
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {tasks.length > 0 ? (
                        tasks.map((task: Task) => (
                            <View key={task.id} className="flex flex-row items-center justify-between px-8">
                                <View>
                                    <Checkbox
                                        value={task.title}
                                        isChecked={task.completed}
                                        onChange={() => toggleCompleted(task.id)}
                                    >
                                        <CheckboxIndicator size="md">
                                            <CheckboxIcon as={CheckIcon} />
                                        </CheckboxIndicator>
                                    </Checkbox>
                                </View>
                                <ThemedText
                                    className={cn("w-3/4 mx-auto", task.completed && "line-through")}
                                    onPress={() => toggleCompleted(task.id)}
                                >
                                    {task.title}
                                </ThemedText>
                                <Button
                                    onPress={() => {
                                        setTaskIdToDelete(task.id);
                                        setShowModal2(true);
                                    }}
                                    variant="outline"
                                    className="border-0 p-0"
                                >
                                    <Icon as={ArchiveXIcon} className="text-red-500" />
                                </Button>
                            </View>
                        ))
                    ) : (
                        <Text className="px-8 pt-2 text-slate-500">
                            Il n'existe pas de tâche, veuillez en créer une.
                        </Text>
                    )}
                    <AddTaskModal setShowModal={setShowModal} showModal={showModal} addTask={addTask} />
                    <DeleteTaskModal
                        showModal={showModal2}
                        setShowModal={setShowModal2}
                        deleteTask={deleteTask}
                        taskId={taskIdToDelete}
                    />
                </ScrollView>
            )}
        </View>
    );
}
