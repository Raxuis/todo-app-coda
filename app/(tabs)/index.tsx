import {Image, StyleSheet, Platform, Text} from 'react-native';

import {HelloWave} from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import {ThemedView} from '@/components/ThemedView';

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/banner.jpg')}
                    className="size-full object-contain"
                />
            }>
            <ThemedView style={styles.titleContainer}>
                <ThemedText type="title" className={'text-red-300'}>Welcome!</ThemedText>
                <HelloWave/>
            </ThemedView>
            <ThemedView>
                <Text className="text-slate-500 text-sm">
                    Come check out the todo app.
                </Text>
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems:
            'center',
        gap:
            8,
    },
    stepContainer: {
        gap: 8,
        marginBottom:
            8,
    }
    ,
});
