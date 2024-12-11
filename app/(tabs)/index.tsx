import {Image, StyleSheet} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import {ThemedText} from '@/components/ThemedText';
import BookList from "@/components/books/BookList";
import React from "react";

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/bookshelf-logo.png')}
                    style={styles.reactLogo}
                />
            }>

            <ThemedText type="title">Добро пожаловать</ThemedText>
            <ThemedText type="title">IT Bookshelf</ThemedText>
            <BookList/>

        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 278,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
