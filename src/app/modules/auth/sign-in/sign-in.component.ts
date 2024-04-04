import { NgIf } from '@angular/common';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {  Router, RouterLink , NavigationExtras } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent, FuseAlertType } from '@fuse/components/alert';
import { NavigationMockApi } from 'app/mock-api/common/navigation/api'
import { Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { SignIn } from 'app/Model/signin';
import { SigninService } from 'app/Services/signinService.service';


@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    standalone   : true,
    imports      : [RouterLink, FuseAlertComponent, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatCheckboxModule, MatProgressSpinnerModule],

})
export class AuthSignInComponent implements OnInit {

responseDataArray: any[] = []; // Define an array property to store response data
sign :SignIn ;

    signInForm: FormGroup;
    showAlert: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,

        private _formBuilder: FormBuilder,
        private _router: Router,
        private  SigninService:SigninService

    ) {}

    ngOnInit(): void {
        this.signInForm = this._formBuilder.group({
            email     : ['', [Validators.required, Validators.email]],
            password  : ['', Validators.required],
            rememberMe: ['']
        });
    }
    signIn(): void {
        console.log('Email field valid:', this.signInForm.get('email').valid);
        console.log('Password field valid:', this.signInForm.get('password').valid);
        if (this.signInForm.invalid) {
            console.error('Invalid form');
            return;
        }
        this.SigninService.SignInUser(this.signInForm.value).subscribe(
            response => {
                console.log('Sign in successful:', response);
                // Display user response in VS Code console
                console.log('User response:', response);

                // Push response data into the array
                this.responseDataArray.push(response);

                // Register response data as an array in localStorage
                localStorage.setItem('userData', JSON.stringify(this.responseDataArray));

                const userType = 'user';
                //const authenticated = "true";
                //localStorage.setItem('Auth', authenticated);
                localStorage.setItem('userType', userType);

                const redirectURL = decodeURIComponent(this._activatedRoute.snapshot.queryParamMap.get('redirectURL')) || '/signed-in-redirect-user';
                this._router.navigateByUrl(redirectURL);

            },
            error => {
                console.error('Error during sign in:', error);
            }
        );
    }


}