import { RoleService } from './../../../../../Services/role.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserData } from 'app/Model/session';
import { debounceTime, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
    selector       : 'notes-labels',
    templateUrl    : './update.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatButtonModule,  MatSnackBarModule,ReactiveFormsModule,MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, FormsModule, AsyncPipe],
})
export class UpdateComponent implements OnInit, OnDestroy
{
    composeFormF: FormGroup;
    type :any
    flashMessage: 'success' | 'error' | null = null;
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    roleId: string;

    /**
     * Constructor
     */
    constructor(
        private _snackBar: MatSnackBar,
        public matDialogRef: MatDialogRef<UpdateComponent>,
        private formBuilder: FormBuilder,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private roleService : RoleService
    )
    {
        
        this.roleId = this.data.role;
        console.log("sended role",this.roleId);
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
            name: ['', Validators.required],
            
        });
    }
    onCancel(): void {
        // Fermer le dialogue sans rien faire
        this.matDialogRef.close();
      }

    openSnackBar(message: string, type: string) { 
        this._snackBar.open(message, 'close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: [type === 'error' ? 'mat-snack-bar-container-error' : 'mat-snack-bar-container-success'] // Appliquer la classe de couleur en fonction du type
          });
          
      }


      send(): void {
        if (this.composeFormF.valid) {
            // Check if the conversion is successful
            console.log("sended role",this.roleId);
                const Roleaddd = {
                 
                    name: this.composeFormF.value.name,
                    
                    
                };
               


                
                
                this.roleService.updateRole( this.CompanyId,this.roleId,Roleaddd).subscribe(
                    response => {
                                 
                 
                        if (this.type ='success')   {
                            this.openSnackBar('Role updated  successfuy', 'Close');
                           }
                        this.matDialogRef.close();
                    console.log('Role added:', response); 
                    window.location.reload();
                    },
                    error => {
                     
                        console.error('Error updating Role', error);
                       
                       
                       
                    }
                );
            } 
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
}
