import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BooksComponent } from './book/books.component';
import { AddBookComponent } from './book/addbook.component';
import { EditBookComponent } from './book/editbook.component';
import { AdminPageComponent } from './admin/admin-page.component';
import { BookService } from './book/book.service';
import { UserService } from './user/user.service';
import { UsersComponent } from './user/users.component';
import { AddUserComponent } from './user/adduser.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './auth/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
        FetchDataComponent,
        BooksComponent,
        AddBookComponent,
        EditBookComponent,
        AdminPageComponent,
        UsersComponent,
        AddUserComponent,
        RegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
        { path: 'fetch-data', component: FetchDataComponent },
        { path: 'books', component: BooksComponent },
        { path: 'add-book', component: AddBookComponent },
        { path: 'books/edit/:id', component: EditBookComponent },
        { path: 'admin-page', component: AdminPageComponent },
        { path: 'users', component: UsersComponent },
        { path: 'add-user', component: AddUserComponent },
        { path: 'register', component: RegisterComponent }
    ])
    ],
    providers: [BookService, UserService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
