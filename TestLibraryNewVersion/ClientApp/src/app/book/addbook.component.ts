import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "./book.service";
import { Book } from "./book";

@Component({
    templateUrl: './addbook.component.html'
})

export class AddBookComponent {
    public book: Book = new Book();
    public books: Book[];

    constructor(private router: Router, private activateRoute: ActivatedRoute, private bookService: BookService) {
        this.bookService.getBooks()
            .toPromise()
            .then(response => {
                this.getBooks();
            });
    }

    private getBooks() {
        this.bookService.getBooks().subscribe((result: Book[]) => {
            this.books = result;
        })
    }

    save(book: Book) {
        console.log(book);
        this.bookService.createBook(book).subscribe((response: Book) => {
            this.book = response;
            this.router.navigate(['/books']);
        });
    }

    cancel() {
        this.router.navigate(['/books']);
    }
}
