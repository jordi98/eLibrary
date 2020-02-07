import { Component } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    isExpanded = false;
    public isAuth: boolean = false;
    public userName: string = null;

    constructor(private auth: AuthenticationService, private router: Router) {
        this.isAuth = auth.isAuth;
        this.userName = auth.currentUsername;
        auth.appComponent = this;
    }

    openHomePage() {
        this.router.navigate(['admin-page']);
    }

    logout(): void {
        this.auth.logout();
        this.isAuth = this.auth.isAuth;
        this.userName = this.auth.currentUsername;
        this.router.navigate(['/login']);
    }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
