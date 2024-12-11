import React, {useEffect, useState} from 'react';
import BookCard from "@/components/books/BookCard";
import bookService from "@/services/books";
import {Book} from "@/services/types/books";
import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {Linking} from "react-native";

export default function BookList() {
    const [books, setBooks] = useState<Book[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await bookService.getBooksList(1, null, 25);
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

        fetchBooks();
    }, []);

    if (loading) return <ThemedText>Loading...</ThemedText>;
    if (!books) return <ThemedText>Ничего нет</ThemedText>;
    return (
        <ThemedView>
            {books.map(book => (
                <React.Fragment key={book.id}>
                    {BookCard(
                        book,
                        (bookID: number) => {
                            Linking.openURL(`https://it-bookshelf.ru/book/${bookID}`)
                        },
                        () => {
                        },
                        () => {
                        },
                        false)
                    }
                </React.Fragment>
            ))}
        </ThemedView>
    );
}
