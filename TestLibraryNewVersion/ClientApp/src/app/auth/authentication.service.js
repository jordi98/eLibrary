"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const http_1 = require("@angular/http");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
let AuthenticationService = class AuthenticationService {
    constructor(http) {
        this.http = http;
        this.registerUrl = 'api/account/register';
        this.loginUrl = 'token';
        this.currentUserRole = 'No Role';
        this.currentUserName = 'No UserName';
        this.currentUserId = 0;
        this.isAuth = false;
        this.appComponent = null;
        this.currentUserId = Number(localStorage.getItem('UserId'));
        this.currentUserName = localStorage.getItem('UserName');
        this.currentUserRole = localStorage.getItem('UserRole');
        this.isAuth = this.currentUserId > 0;
    }
    login(loginModel) {
        var inputBody = 'grant_type=password&username=' + loginModel.UserName + '&password=' + loginModel.Password;
        let headers = new http_1.Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.loginUrl, inputBody, options)
            .map((response) => {
            let body = response.json();
            this.currentUserRole = JSON.parse(body.roles)[0];
            this.currentUserId = Number(body.id);
            this.currentUserName = body.userName;
            this.isAuth = true;
            //set headers values
            this.appComponent.isAuth = true;
            this.appComponent.userName = body.userName;
            localStorage.setItem('token', body.access_token);
            localStorage.setItem('userName', this.currentUserName);
            localStorage.setItem('userRole', this.currentUserRole);
            localStorage.setItem('userId', String(this.currentUserId));
            return body;
        }).catch((error) => {
            return Observable_1.Observable.throw(error || 'Login error');
        });
    }
    register(registerModel) {
        return this.http.post(this.registerUrl, registerModel)
            .map((result) => result)
            .catch((error) => {
            return Observable_1.Observable.throw(error || 'Register error');
        });
    }
    signOut() {
        this.isAuth = false;
        this.currentUserId = 0;
        this.currentUserName = 'No name';
        this.currentUserRole = 'No role';
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');
        return true;
    }
};
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map