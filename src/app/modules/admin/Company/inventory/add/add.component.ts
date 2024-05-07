import { CompanieServiceService } from 'app/Services/companie-service.service';
import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserData } from 'app/Model/session';
import { debounceTime, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { MailboxComposeComponent } from 'app/modules/admin/apps/mailbox/compose/compose.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector       : 'notes-labels',
    templateUrl    : './add.component.html',
    styles: [`
    .custom-snackbar-error {
      background-color: white; // Fond blanc pour les erreurs
      color: red; // Texte en rouge pour les erreurs
    }

    .custom-snackbar-success {
      background-color: white; // Fond blanc pour les succès
      color: green; // Texte en vert pour les succès
    }

    .custom-snackbar-error button,
    .custom-snackbar-success button {
      color: red; // Couleur du bouton en rouge
      font-weight: bold; // Texte en gras
    }
  `],
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        AsyncPipe,
        CommonModule,
        MatSnackBarModule
    ]
    
})
export class AddComponent implements OnInit, OnDestroy


{ 

    type :any
    flashMessage: 'success' | 'error' | null = null;
    composeForm: FormGroup;
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    constructor(
        private _snackBar: MatSnackBar,
        private _changeDetectorRef: ChangeDetectorRef,
        public matDialogRef: MatDialogRef<AddComponent>,
        private formBuilder: FormBuilder, // Use FormBuilder directly
        private CompanieServiceService: CompanieServiceService // Use the loan requests service directly
    ) {}




    saveAndClose(): void {
        this.saveAsDraft();
        this.matDialogRef.close();
    }

    discard(): void {
        // Implement discard logic here if needed
    }

    saveAsDraft(): void {
        // Implement saveAsDraft logic here if needed
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.composeForm = this.formBuilder.group({  
            name: [''],
            
            email: [''], // Ajoutez le champ email
            website: [''] // Ajoutez le champ website
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





    send(): void {
        if (this.composeForm.valid) {
            // Check if the conversion is successful
           
                const companyUpdate = {
                    id:this.CompanyId,
                    name: this.composeForm.value.name,
                    email:this.composeForm.value.email,
                    website:this.composeForm.value.website,
                    createdAt:this.composeForm.value.createdAt
                    
                };
               



                
                this.CompanieServiceService.updateCompany( this.CompanyId,companyUpdate).subscribe(
                    response => {
                        this.type ='success'         
                  console.log("name of company",this.composeForm.value.name);
                       console.log("companyyyyyyy id mabroukk!!!!",this.CompanyId);
                       
                    console.log('company update successfully:', response);
                   console.log(this.type);
                   if (this.type ='success')   {
                    this.openSnackBar('update successfuy', 'Close');
                   }
                  
                        // Handle success response
                        console.log('company update successfully:', response);
                    
                        this.matDialogRef.close();
                        window.location.reload();
                      
                    },
                    error => {
                     if (this.type = 'error')  {
                        this.openSnackBar('Error message while adding ', 'Close');
                     }
                     
                        console.error('Error adding companny:', error);
                       
                    }
                );
            } 
        }








        onCancel(): void {
            // Fermer le dialogue sans rien faire
            this.matDialogRef.close();
          }
    

    }




