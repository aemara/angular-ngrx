import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { catchError, EMPTY, map, Observable, switchMap, tap } from "rxjs";
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
    booksService.getBooks().subscribe((books: Book[]) => {
      initialState.books = [...books];
      this.setState(initialState);
    });
    super();
  }

  addBook = this.effect((book$: Observable<Book>) =>
    book$.pipe(
      switchMap((book) =>
        this.booksService.addBook(book).pipe(
          tap({
            next: (addedBook) =>
              this.setState((state: any) => {
                return {
                  ...state,
                  books: [...state.books, addedBook],
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
}
