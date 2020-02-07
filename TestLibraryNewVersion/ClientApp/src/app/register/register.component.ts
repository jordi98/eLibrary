import { Component } from "@angular/core";
import { Registration } from "./registration";
import { Router } from "@angular/router";
import { AuthenticationService } from "../auth/authentication.service";

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    model: Registration = new Registration();
    loading = false;

    constructor(private router: Router, private authService: AuthenticationService) {

    }

    register() {
        this.loading = true;
        if (this.model.password === this.model.confirmPassword) {
            console.log(this.model);
            this.authService.register(this.model).subscribe((response: any) => {
                let temp = response;
                this.loading = false;
                this.router.navigate(['/']);
            },
                (error: any) => {
                    let temp = error;
                    console.log(error);
                    alert('Registration error!');
                });
        }
        else {
            alert("Passwords do not match!")
        }
    }
}
