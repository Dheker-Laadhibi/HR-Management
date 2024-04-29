import { RoleService } from './../../../../../Services/role.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { UserData } from 'app/Model/session';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
    selector       : 'notes-labels',
    templateUrl    : './add.component.html',
    encapsulation  : ViewEncapsulation.None,
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
    standalone     : true,
    imports        : [MatButtonModule,MatSnackBarModule,ReactiveFormsModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, FormsModule, AsyncPipe],
})
export class AddComponent implements OnInit, OnDestroy
{
    type :any

    composeForm: FormGroup;
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';



    openSnackBar(message: string, type: string) { 
        this._snackBar.open(message, 'close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: [type === 'error' ? 'mat-snack-bar-container-error' : 'mat-snack-bar-container-success'] // Appliquer la classe de couleur en fonction du type
          });
          
      }

    send(): void {
        if (this.composeForm.valid) {
            // Check if the conversion is successful
           
                const Roleaddd = {
                 
                    name: this.composeForm.value.name,
                    
                    
                };
               



                
                this.RoleService.addRole( this.CompanyId,Roleaddd).subscribe(
                    response => {
                                 
                 
                        if (this.type ='success')   {
                            this.openSnackBar('Role added  successfuy', 'Close');
                           }
                        this.matDialogRef.close();
                    console.log('Role added:', response);
                  
                  
                    window.location.reload();
                    
                       
                      
                    },
                    error => {
                     
                        console.error('Error fetching Roles', error);
                        this.showFlashMessage('error');
                       
                       
                    }
                );
            } 
        }


    
    


   
           flashMessage: 'success' | 'error' | null = null;
  

    

   
    
    
         
    
   

   
    
   

    
    

    
  

    


    /**
     * Show flash message
     */
    showFlashMessage(type: 'success' | 'error'): void
    {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() =>
        {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

   

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private RoleService:RoleService,
        private _snackBar: MatSnackBar,

        public matDialogRef: MatDialogRef<AddComponent>,
    )
    {
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
}
