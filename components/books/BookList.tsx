import React, {useEffect, useState} from 'react';
import BookCard from "@/components/books/BookCard";
import bookService from "@/services/books";
import {Book} from "@/services/types/books";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Linking, StyleSheet, TouchableOpacity} from "react-native";
import {ThemedTextInput} from "@/components/ThemedTextInput";
import {IconSymbol} from "@/components/ui/IconSymbol";
import {createFilterBook} from "@/services/filters";



export default function BookList() {
    const [books, setBooks] = useState<Book[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchText, setText] = useState('');

    const filter = createFilterBook({})

    async function fetchBooks() {
        try {
            setLoading(true);
            const response = await bookService.getBooksList(1, filter, 25);
            if (response) {
                setBooks(response.books);
            } else {
                setBooks(null);
            }
        } catch (error) {
            console.error('Failed to fetch books:', error);
            setBooks(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {fetchBooks()}, []);

    return (
        <ThemedView>
            <ThemedView style={styles.inputRow}>
                <ThemedTextInput style={styles.input}
                    placeholder="Поиск..."
                    onChangeText={newText => {filter.title = newText}}
                />
                <TouchableOpacity onPress={() => fetchBooks()}>
                    <IconSymbol size={28} name="search.fill" color="white"/>
                </TouchableOpacity>
            </ThemedView>

            {books && books.map(book => (
                <React.Fragment key={book.id}>
                    {BookCard(
                        book,
                        (bookID: number) => {
                            Linking.openURL(`https://it-bookshelf.ru/book/${bookID}/download?as-file=true`)
                        },
                        () => {
                        },
                        () => {
                        },
                        false)
                    }
                </React.Fragment>
            ))}

            {!books && !loading && <ThemedText>Ничего нет</ThemedText>}

            {loading && <ThemedText>Loading...</ThemedText>}

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    inputRow: {
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingStart: 10,
        paddingEnd: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 30,
    },
    input: {
        width: '90%',
        fontSize: 24,
        fontWeight: 'bold',
        lineHeight: 24,
        padding: 20,
    }
});
