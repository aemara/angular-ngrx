import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { BooksComponent } from '../books/books.component';
import { BooksService } from '../services/books.service';
@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent, BooksComponent],
  bootstrap: [AppComponent],
  providers: [BooksService],
})
export class AppModule {}
