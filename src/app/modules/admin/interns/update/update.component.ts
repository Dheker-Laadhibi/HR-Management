import { InternService } from './../../../../Services/intern.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { UserData } from 'app/Model/session';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateTime } from 'luxon';
@Component({
    selector       : 'notes-labels',
    templateUrl    : './update.component.html',
    encapsulation  : ViewEncapsulation.None,
  
    standalone     : true,
    imports        : [MatButtonModule,  MatDatepickerModule,MatSnackBarModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, FormsModule, AsyncPipe,MatSnackBarModule],
})
export class UpdateComponent implements OnInit, OnDestroy
{    intern: any;
    composeFormF: FormGroup;
    type :any
    flashMessage: 'success' | 'error' | null = null;
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    internIdSended:string
    

    /**
     * Constructor
     */
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
        private _snackBar: MatSnackBar,
        public matDialogRef: MatDialogRef<UpdateComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private InternService:InternService,
    )
    {

     
    this.internIdSended=this.data.intern.id;
    console.log("id internooo" , this.internIdSended);
    
      this.intern= this.data.intern;
      console.log("sended intern",this.intern);
  
     
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.composeFormF = this.formBuilder.group({  
          email: ['', Validators.required],
          Gender: ['', Validators.required],
           Adress: ['', Validators.required],
          PhoneNumber: ['', Validators.required],
         
        });
    }


    openSnackBar(message: string, type: string) { 
        this._snackBar.open(message, 'close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: [type === 'error' ? 'mat-snack-bar-container-error' : 'mat-snack-bar-container-success'] // Appliquer la classe de couleur en fonction du type
          });
          
      }
      
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
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

    onCancel(): void {
        // Fermer le dialogue sans rien faire
        this.matDialogRef.close();
      }



  send(): void {
  
      // Envoi de la date formatée au serveur
      const interntData = {
        email: this.composeFormF.value.email,
        Gender: this.composeFormF.value.Gender,
        PhoneNumber: this.composeFormF.value.PhoneNumber,
        Adress: this.composeFormF.value.Adress,
        
      };
  

      // Envoyer les données au serveur
      this.InternService.updateIntern(this.CompanyId,this.internIdSended,interntData).subscribe(
        (response) => {
          this.type ='success'  
          console.log('intern   updated avec succès :', response);
          if (this.type ='success')   {
            this.openSnackBar(' intern updated successfuy', 'Close');
            this.matDialogRef.close();
            window.location.reload();

            
           }
          
          // Gérer la réponse du serveur si nécessaire
        },
        (error) => {

          if (this.type = 'error')  {
            this.openSnackBar('Error message while updating ', 'Close');
          
         }
          console.error('Erreur lors de l\'ajout du projet :', error);
          // Gérer l'erreur si nécessaire
        }
      );
    } 

  }
































