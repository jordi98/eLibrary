import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from './book';
import { BookService } from './book.service';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
})
export class BooksComponent {
    public books: Book[];

    constructor(private router: Router, private bookService: BookService) {
        this.bookService.getBooks()
            .toPromise()
            .then((result: any) => {
                this.books = result;
            });
    }

    load() {
        this.bookService.getBooks().subscribe((data: Book[]) => this.books = data);
    }

    delete(id: number) {
        this.bookService.deleteBook(id).subscribe(data => this.load());
    }
}
