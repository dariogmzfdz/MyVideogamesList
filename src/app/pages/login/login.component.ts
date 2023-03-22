import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    hide = true;

    loginForm = {
        email: '',
        password: '',
    };
    isLogged = false;
    isLoginFailed = false;
    errorLogin = '';

    constructor(private dataService: DataService, private tokenStorageService: TokenStorageService) {}

    ngOnInit(): void {}

    onSubmit(f: NgForm): void {
        const { email, password } = this.loginForm;
        console.log(email, password);
        

        this.dataService.login(email, password).subscribe(
            (data) => {
                this.tokenStorageService.saveToken(data.token);
                this.isLogged = true;
                this.isLoginFailed = false;
                this.errorLogin = '';
                window.location.href = '/';
            },
            (err) => {
                this.errorLogin = err.error.message;
                this.isLoginFailed = true;
            }
        );        
    }

    logout(): void {
        this.tokenStorageService.signOut();
        window.location.reload();
    }
}
