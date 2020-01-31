import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { BookService } from "./book.service";
import { Book } from "./book";

@Component({
    templateUrl: './editbook.component.html'
})

export class EditBookComponent {
    public book: Book = new Book();
    private bookId: number;

    constructor(private bookService: BookService, private router: Router, private activateRoute: ActivatedRoute) {
        this.bookId = activateRoute.snapshot.params["id"];
        this.bookService.getBookById(this.bookId).subscribe((result: Book) => {
            this.book = result;
        });
    }

    save(book: Book) {
        console.log(book);
        this.bookService.updateBook(this.bookId, book).subscribe(resp => {
            this.router.navigate(['/books']);
        });
    }

    cancel() {
        this.router.navigate(['/books']);
    }
}
