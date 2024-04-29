
import {  ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';

import { UserData } from 'app/Model/session';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MissionOrdersService } from 'app/Services/mission-orders.service';
@Component({
    selector       : 'notes-labels',
    templateUrl    : './update.component.html',
    encapsulation  : ViewEncapsulation.None,
  
    standalone     : true,
    imports        : [MatButtonModule, MatSnackBarModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule,MatSnackBarModule],
})
export class UpdateComponent implements OnInit, OnDestroy
{    missionId: string;
  composeForm: FormGroup;
    type :any
    flashMessage: 'success' | 'error' | null = null;
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    
    

    /**
     * Constructor
     */
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
        private _snackBar: MatSnackBar,
        public matDialogRef: MatDialogRef<UpdateComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        private formBuilder: FormBuilder,
        private MissionOrdersService:MissionOrdersService,
    )
    {
      this.missionId = data.mission;
      console.log("sended mission",this.missionId);
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
          Object: ['', Validators.required],
          transport: ['', Validators.required], 
          description: ['', Validators.required],
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
      const missionupdt = {
        description: this.composeForm.value.description,
        transport: this.composeForm.value.transport,
        Object: this.composeForm.value.Object,
        
      };
  
      // Envoyer les données au serveur
      this.MissionOrdersService.updateMission(this.CompanyId,this.missionId,missionupdt).subscribe(
        (response) => {
          this.type ='success'  
          console.log('mission updated avec succès :', response);
          if (this.type ='success')   {
            this.openSnackBar(' mission  updated successfuy', 'Close');
            this.matDialogRef.close();
           console.log(" this.data", this.data);
           
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
