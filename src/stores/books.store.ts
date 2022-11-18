import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { map, Observable } from "rxjs";
import { BooksService } from "../services/books.service";
import { Book } from "../models/book";
export interface BooksState {
  books: Book[];
}

@Injectable()
export class BooksStore extends ComponentStore<BooksState> {
  readonly books$: Observable<Book[]> = this.select((state) => state.books);

  constructor(private booksService: BooksService) {
    const initialState: BooksState = {
      books: [],
    };
    booksService.getBooks().subscribe((book: Book) => {
      initialState.books.push(book);
    });
    super(initialState);
  }

  addBook(book: Book) {
    this.setState((state) => {
      return {
        ...state,
        books: [...state.books, book],
      };
    });

    this.booksService.addBook(book);
  }
}
