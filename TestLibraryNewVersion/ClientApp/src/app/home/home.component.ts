import { Component } from '@angular/core';
import { BookService } from '../book/book.service';
import { Router } from '@angular/router';
import { Book } from '../book/book';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent {
    public books: Book[];

    constructor(private router: Router, private service: BookService) {
        this.service.getBooks()
            .toPromise()
            .then((result: Book[]) => {
                this.books = result;
            })
    }

    //load() {
    //    this.service.getAll().subscribe((data: Book[]) => this.books = data);
    //}
}
