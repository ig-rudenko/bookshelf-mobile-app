import {FlatList, Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';

import {Book} from "@/services/types/books";
import React from "react";
import {formatBytes} from "@/services/formatter";
import {ThemedView} from "@/components/ThemedView";
import {ThemedText} from "@/components/ThemedText";
import {IconSymbol} from "@/components/ui/IconSymbol";


function getLanguagePairByLabel(label: string) {
    const languagesList = [
        {label: "Русский", code: "ru"},
        {label: "Английский", code: "gb"}
    ]
    for (const element of languagesList) {
        if (element.label === label) return element;
    }
    return languagesList[0];
}


export default function BookCard(book: Book, onBookClick: Function, onPublisherClick: Function, onTagSelect: Function, isMobile: boolean = true) {
    // const [showTags, setShowTags] = useState(false);
    const showTags = false;
    // const toggleTagsOverlay = () => {
    //     setShowTags(!showTags);
    // };
    return (
        <ThemedView style={[styles.cardPlate]}>
            {book.previewImage && (
                <TouchableOpacity onPress={() => onBookClick(book.id)}>
                    <Image source={{uri: "https://it-bookshelf.ru" + book.previewImage}} style={styles.bookImage}/>
                </TouchableOpacity>
            )}

            {!isMobile && (
                <ThemedView style={styles.bookAbout}>
                    <ThemedText style={styles.bookTitle}>
                        <ThemedText type="title" onPress={() => onBookClick(book.id)}>{book.title}</ThemedText>
                    </ThemedText>

                    <ThemedView style={[styles.publisherInfo]}>
                        {!isMobile && (
                            <ThemedText style={styles.publisherText}>Издательство</ThemedText>
                        )}
                        <TouchableOpacity onPress={() => onPublisherClick(book.publisher.name)}>
                            <ThemedText style={styles.publisherName}>{book.publisher.name}</ThemedText>
                        </TouchableOpacity>
                        <ThemedText style={styles.year}>{book.year} г.</ThemedText>
                    </ThemedView>

                    <ThemedView style={styles.languageAndTags}>
                        {!isMobile && (
                            <ThemedText style={styles.languageText}>Язык книги: {book.language}</ThemedText>
                        )}
                        <Image
                            source={{uri: `https://flagcdn.com/${getLanguagePairByLabel(book.language)}.svg`}}
                            style={styles.languageFlag}
                        />
                    </ThemedView>

                    <ThemedView style={styles.authorsInfo}>
                        <ThemedText style={styles.authorsText}>{book.authors}</ThemedText>
                        <ThemedText>{book.pages} стр. | {formatBytes(book.size)}</ThemedText>
                    </ThemedView>

                    <View style={styles.tagsContainer}>
                        {book.tags.map(item => (
                            <TouchableOpacity key={item.id} onPress={() => onTagSelect(item.name)}>
                                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                    <IconSymbol size={28} name="tag.fill" color="white"/>
                                    <ThemedText style={styles.tag}>{item.name}</ThemedText>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                </ThemedView>
            )}

            {isMobile && (
                <ThemedView style={styles.mobileView}>
                    <TouchableOpacity>
                        <ThemedText style={styles.tagIcon}>#</ThemedText>
                    </TouchableOpacity>
                    {showTags && (
                        <Modal transparent={true} visible={showTags}>
                            <ThemedView style={styles.modalContainer}>
                                <FlatList
                                    data={book.tags}
                                    keyExtractor={(item) => item.name}
                                    renderItem={({item}) => (
                                        <TouchableOpacity onPress={() => onTagSelect(item.name)}>
                                            <ThemedText style={styles.tag}>{item.name}</ThemedText>
                                        </TouchableOpacity>
                                    )}
                                />
                            </ThemedView>
                        </Modal>
                    )}
                </ThemedView>
            )}
        </ThemedView>
    );
};


const styles = StyleSheet.create({
    cardPlate: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    bookImage: {
        minWidth: 200,
        maxWidth: 360,
        minHeight: 500,
        maxHeight: 800,
        borderRadius: 5,
    },
    bookAbout: {
        padding: 10,
        paddingVertical: 40,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    publisherInfo: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    publisherText: {
        marginRight: 5,
    },
    publisherName: {
        fontWeight: 'bold',
    },
    year: {
        marginLeft: 5,
    },
    languageAndTags: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    languageText: {
        marginRight: 5,
    },
    languageFlag: {
        width: 24,
        height: 24,
    },
    authorsInfo: {
        marginVertical: 10,
    },
    authorsText: {
        fontWeight: 'bold',
    },
    tagsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        borderRadius: 15,
        width: "auto",
        padding: 5,
        paddingEnd: 10,
        margin: 5,
    },
    mobileView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagIcon: {
        fontSize: 18,
        marginRight: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
