import { Injectable } from "@angular/core";
import { from, of } from "rxjs";
import { Book } from "../models/book";
@Injectable()
export class BooksService {
  constructor() {}

  listOfBooks: Book[] = [
    {
      name: "The Road",
      author: "Cormac McCarthy",
    },
    {
      name: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
    },
    {
      name: "The Secret History",
      author: "Donna Tartt",
    },
  ];

  getBooks() {
    const books$ = from(this.listOfBooks);
    return books$;
  }

  addBook(book: Book) {
    this.listOfBooks.push(book);
    console.log("book was added");
    console.log(this.listOfBooks);
  }
}
