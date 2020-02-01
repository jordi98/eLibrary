import { Injectable, Inject } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { User } from "./user";

@Injectable()
export class UserService {
    url: string = "";

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this.url = baseUrl;
    }

    getUsers() {
        return this.http.get(this.url + 'api/Users');
    }

    getUserById(id: string) {
        return this.http.get(this.url + 'api/Users/' + id);
    }

    searchUser(name: string) {
        return this.http.get(this.url + 'api/Users/search/' + name);
    }

    createUser(user: User) {
        return this.http.post(this.url + 'api/Users', user);
    }
    updateUser(userId: string, user: User) {
        return this.http.put(this.url + 'api/Users/' + userId, user);
    }
    deleteUser(Id: string) {
        return this.http.delete(this.url + 'api/Users/' + Id);
    }
}
