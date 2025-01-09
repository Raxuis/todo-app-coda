import AsyncStorage from '@react-native-async-storage/async-storage';
import {Task} from "@/app/(tabs)/todo";

export abstract class AsyncStorageService {
    public static async setAsyncStorage(key: string, task: any[]): Promise<void> {
        const jsonTask: string = JSON.stringify(task);
        await AsyncStorage.setItem(key, jsonTask);
    }

    public static async getAsyncStorageValue(key: string): Promise<Task[]> {
        const jsonTask = await AsyncStorage.getItem(key);
        if (jsonTask !== null) {
            return JSON.parse(jsonTask);
        } else {
            return [];
        }
    }
}
