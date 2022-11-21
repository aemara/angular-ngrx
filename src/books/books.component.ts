import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BooksStore } from '../stores/books.store';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [BooksStore],
})
export class BooksComponent implements OnInit {
  bookName: string;
  bookAuthor: string;
  books$ = this.booksStore.books$;
  isLoading$ = this.booksStore.isLoading$;
  constructor(private readonly booksStore: BooksStore) {}

  ngOnInit() {
  }

  addBook() {
    const book: Book = {
      id: this.bookName,
      name: this.bookName,
      author: this.bookAuthor,
    };

    this.booksStore.addBook(book);
  }

  deleteBook(bookId: string) {
    this.booksStore.deleteBook(bookId);
  }
}
