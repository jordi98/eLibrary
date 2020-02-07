import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration } from '../register/registration';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    url: string = "";
    private currentUserSubject: BehaviorSubject<ApplicationUser>;
    public currentUser: Observable<ApplicationUser>;
    public isAuth: boolean = false;
    public appComponent: any = null;
    public currentUsername: string = null;

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl;
        this.currentUserSubject = new BehaviorSubject<ApplicationUser>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        this.currentUsername = localStorage.getItem('UserName');
    }

    public get currentUserValue(): ApplicationUser {
        return this.currentUserSubject.value;
    }

    register(registerModel: Registration) {
        return this.http.post(this.url + 'api/Auth/register', registerModel);
    }

    login(username: string, password: string) {
        return this.http.post<any>('/api/Auth/login', { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('userName', this.currentUsername);
                    this.currentUserSubject.next(user);
                    this.currentUsername = user.username;
                    this.isAuth = true;
                    this.appComponent.isAuth = true;
                    this.appComponent.userName = user.username;
                }
                console.log(user.username);
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this.isAuth = false;
        this.currentUsername = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userName');
        this.currentUserSubject.next(null);
    }
}

export interface ApplicationUser {
    token: string;
    username: string;
    expiresIn: Date;
}
