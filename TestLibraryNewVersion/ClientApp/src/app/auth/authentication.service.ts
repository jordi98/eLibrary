import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registration } from '../register/registration';

@Injectable()
export class AuthenticationService {
    url: string = "";

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl;
    }

    register(registerModel: Registration) {
        return this.http.post(this.url + 'api/Auth/register', registerModel);
    }
}
