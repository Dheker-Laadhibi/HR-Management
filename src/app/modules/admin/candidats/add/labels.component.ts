import { CandidateService } from './../../../../Services/candidate.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatDialog } from '@angular/material/dialog';
import { debounceTime, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { FormBuilder,UntypedFormGroup, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { UserData } from 'app/Model/session';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';




@Component({
    selector       : 'notes-labels',
    templateUrl    : './labels.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports        : [ MatSnackBarModule,MatSelectModule,ReactiveFormsModule, MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, FormsModule],
})

export class AddComponent implements OnInit
{
onCancel() {
  // Fermer le dialogue sans rien faire
  this.matDialogRef.close();
}
  readonly role_name: string = 'Candidate';
  userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
    candidate  : any;
    composeForm: UntypedFormGroup;




    /**
     * Constructor
     */
    constructor(
      public matDialogRef: MatDialogRef<AddComponent>,
      private dialog: MatDialog,
      private formBuilder: FormBuilder,
      private CandidateService : CandidateService,
      private snackBar: MatSnackBar,

    )
    {
    }
    hidePassword = true; // Initialiser à true pour masquer le mot de passe

    togglePasswordVisibility(): void {
        this.hidePassword = !this.hidePassword;
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        console.log('CompanyId:', this.CompanyId);

        this.composeForm = this.formBuilder.group({
              firstname: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
              lastname: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
              email: ['',[Validators.required, Validators.email, Validators.maxLength(255)]],
              password: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(30)]],
            university:['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            adress:['',[Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
            education_level: ['',[Validators.required]] // Initialiser avec une valeur vide
         
          });
    }

    send(): void {
      if (this.composeForm.valid) {
        const candidate = {
        
          email: this.composeForm.value.email,
          firstName: this.composeForm.value.firstname,
          lastName: this.composeForm.value.lastname,
          password: this.composeForm.value.password,
          role_name: this.role_name,
        
          
          university:this.composeForm.value.university,
          adress:this.composeForm.value.adress,
          education_level:this.composeForm.value.education_level,
          
        };
        console.log('candidate role:', candidate.role_name);
        console.log('candidate:', candidate);
        this.CandidateService.createCandidat(this.CompanyId,candidate).subscribe(
         
          response => {
        console.log(candidate);
        
            console.log('candidate added successfully:', candidate);
            this.showSnackbar('candidate added successfully');
            this.dialog.closeAll();
            window.location.reload();
          },
          error => {
            console.error('Error adding candidate:', error);
            this.showSnackbar('Error adding candidate. Please try again.');
          }
        );
      } else {
        console.error('Form is invalid');
      }
    }

    private showSnackbar(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 3000,
      });
    }








    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Add label
     *
     * @param title
     */
    addLabel(title: string): void
    {
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}