import { limits } from 'chroma-js';
import { InternService } from './../../../../Services/intern.service';

import { MissionOrdersService } from './../../../../Services/mission-orders.service';
import {  ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserData } from 'app/Model/session';
import { DateTime } from 'luxon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@Component({
    selector       : 'notes-labels',
    templateUrl    : './add.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports: [
      MatButtonModule,
      ReactiveFormsModule,
      FormsModule,
      MatSelectModule,
      MatDialogModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSnackBarModule,
    ],
})
export class AddComponent implements OnInit, OnDestroy
{
  @Output() missionAdded: EventEmitter<any> = new EventEmitter<any>();



  page=1;
  limits=10;
  
    type :any
    flashMessage: 'success' | 'error' | null = null;
    composeForm: FormGroup;
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
    userId = this.userData[1].data.user.ID || '';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
  private _missionService: MissionOrdersService;
  missions: any[];
 

     // Use FormBuilder directly
   


    /**
     * Constructor
     */
    constructor(
      private _snackBar: MatSnackBar,
        public matDialogRef: MatDialogRef<AddComponent>,
        private formBuilder: FormBuilder, // Use FormBuilder directly
        private _changeDetectorRef: ChangeDetectorRef,
        private InternService:InternService,
      

    )
    {
       

      
    }
    openSnackBar(message: string, type: string) { 
      this._snackBar.open(message, 'close', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: [type === 'error' ? 'mat-snack-bar-container-error' : 'mat-snack-bar-container-success'] // Appliquer la classe de couleur en fonction du type
        });
        
    }
     
   

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */













    
    ngOnInit(): void
    {
     

 //@name InternsIn */


      /**Transport */
        this.composeForm = this.formBuilder.group({  
           firstname: ['', Validators.required],
           start_date: ['', Validators.required], 
            end_date: ['', Validators.required], 
            lastname: ['', Validators.required],
            email: ['', Validators.required], 
            university: ['', Validators.required],
            educationLevel: ['', Validators.required],
           
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


 // Définir la méthode pour obtenir l'entrée de date pour le datepicker
 get dateInput() {
    return 'YYYY-MM-DD';
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

   


send(): void {
    const currentDate = DateTime.now();
    const start_dateTime: DateTime | any = this.composeForm.value.start_date;
    const end_date: DateTime | any = this.composeForm.value.end_date;
    const formattedDate = start_dateTime.toFormat('yyyy-MM-dd');
    const formattedDate2 = end_date.toFormat('yyyy-MM-dd');

if(start_dateTime>currentDate &&end_date>=start_dateTime ){

    
    
   
    
    if (start_dateTime instanceof DateTime && end_date  instanceof DateTime    ) {
        const formattedDate = start_dateTime.toFormat('yyyy-MM-dd');
        const formattedDate2 = end_date.toFormat('yyyy-MM-dd');
        // Utiliser formattedDate comme vous le souhaitez
        console.log("formattedDate",formattedDate);
        console.log("formattedDate2",formattedDate2); // Par exemple, "2024-02-14"
        // Utilisez formattedDate comme vous le souhaitez
       
    } else {
        // Gérer le cas où expDateTime n'est pas une instance de Date
        
        console.log("nest pas instance de date  time ");
    }
  
      // Envoi de la date formatée au serveur
      const internData = {


    //@name InternsIn */
        start_date:formattedDate,
        firstname: this.composeForm.value.firstname,
        lastname: this.composeForm.value.lastname,
        educationLevel:this.composeForm.value.educationLevel,
        university: this.composeForm.value.university,
        end_date:formattedDate2,
        email:this.composeForm.value.email,
      };
  
      // Envoyer les données au serveur
      this.InternService.addIntern(this.CompanyId,this.userId, internData).subscribe(
        (response) => {
          this.type ='success'  
          console.log('intern  adedd avec succès :', response);
          if (this.type ='success')   {
            this.openSnackBar(' new intern  added successfuy', 'Close');
            this.matDialogRef.close();
            
       
           }
          
          // Gérer la réponse du serveur si nécessaire
        },
        (error) => {

          if (this.type = 'error')  {
            this.openSnackBar('Error message while adding ', 'Close');
          
         }
          console.error('Erreur lors de l\'ajout du mission :', error);
          // Gérer l'erreur si nécessaire
        }
      );
    } else{
 console.log("date invalide");
      
  console.log("start_dateTime:", start_dateTime);
console.log("exp_dateTime:", end_date);
console.log("currentDate:", currentDate.toISODate());
        
    }

}

onCancel(): void {
  // Fermer le dialogue sans rien faire
  this.matDialogRef.close();
}


    }
    
