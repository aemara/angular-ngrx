import { Injectable } from "@angular/core";
import { from, Observable, of } from "rxjs";
import { Book } from "../models/book";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class BooksService {
  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get("http://localhost:3000/books");
  }

  addBook(book: Book) {
    return this.http.post("http://localhost:3000/books", book);
  }

  deleteBook(id: string) {
    return this.http.delete(`http://localhost:3000/books/${id}`);
  }
}
