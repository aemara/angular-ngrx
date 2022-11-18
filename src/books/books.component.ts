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
  constructor(private readonly booksStore: BooksStore) {}

  ngOnInit() {}

  addBook() {
    const book: Book = {
      name: this.bookName,
      author: this.bookAuthor,
    };
    this.booksStore.addBook(book);
  }
}
