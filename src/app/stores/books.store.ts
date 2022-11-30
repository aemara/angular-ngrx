import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { catchError, EMPTY, map, Observable, switchMap, tap } from "rxjs";
import { BooksService } from "../services/books.service";
import { Book } from "../models/book";
export interface BooksState {
  books: Book[];
  isLoading: boolean;
}

@Injectable()
export class BooksStore extends ComponentStore<BooksState> {
  readonly books$: Observable<Book[]> = this.select((state) => state.books);
  readonly isLoading$: Observable<Boolean> = this.select(
    (state) => state.isLoading
  );

  constructor(private booksService: BooksService) {
    const initialState: BooksState = {
      books: [],
      isLoading: true,
    };
    super();
    this.setState(initialState);
    booksService.getBooks().subscribe((books: Book[]) => {
      initialState.books = [...books];
      initialState.isLoading = false;
      this.setState(initialState);
    });
  }

  addBook = this.effect((book$: Observable<Book>) =>
    book$.pipe(
      tap(() => {
        this.setState((state) => {
          return { ...state, isLoading: true };
        });
      }),
      switchMap((book) =>
        this.booksService.addBook(book).pipe(
          tap({
            next: (addedBook) =>
              this.setState((state: any) => {
                return {
                  ...state,
                  books: [...state.books, addedBook],
                  isLoading: false,
                };
              }),
            error: (err) => {
              console.log("error");
            },
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  deleteBook = this.effect((bookId$: Observable<string>) =>
    bookId$.pipe(
      switchMap((bookId) =>
        this.booksService.deleteBook(bookId).pipe(
          tapResponse(
            (success) => {
              this.setState((state) => {
                let updatedBooks = state.books.filter(
                  (book) => book.id !== bookId
                );
                return {
                  ...state,
                  books: updatedBooks,
                };
              });
            },
            (error) => console.log(error)
          )
        )
      )
    )
  );
}
