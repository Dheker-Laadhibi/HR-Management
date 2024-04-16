import { ProjectsService } from './../../../../../Services/projects.service';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
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

@Component({
    selector       : 'notes-labels',
    templateUrl    : './add.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports        : [MatButtonModule,
        ReactiveFormsModule, FormsModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, AsyncPipe, MatDatepickerModule,
        MatNativeDateModule,MatNativeDateModule,MatSnackBarModule,],
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

     // Use FormBuilder directly
   


    /**
     * Constructor
     */
    constructor(
      private _snackBar: MatSnackBar,
        public matDialogRef: MatDialogRef<AddComponent>,
        private formBuilder: FormBuilder, // Use FormBuilder directly
        private _changeDetectorRef: ChangeDetectorRef,
        private ProjectsService:ProjectsService,
      

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
        this.composeForm = this.formBuilder.group({  
            projectname: ['', Validators.required],
            exp_date: ['', Validators.required], 
            speciality: ['', Validators.required], 
            description: ['', Validators.required],
            technologies: [[]],
            code: ['', Validators.required],
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


  // Méthode pour convertir les données entrées en un tableau de chaînes
  convertToTechnologiesArray(technologiesString: string): string[] {
    // Séparez les technologies saisies par l'utilisateur en utilisant une virgule ou un autre séparateur de votre choix
    return technologiesString.split(',').map(tech => tech.trim());
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

    const expDateTime: DateTime | any = this.composeForm.value.exp_date;
    const formattedDate = expDateTime.toFormat('yyyy-MM-dd');

if(expDateTime>currentDate){

    
    const technologiesArray = this.convertToTechnologiesArray(this.composeForm.value.technologies);
  
    
   
    
    if (expDateTime instanceof DateTime) {
        const formattedDate = expDateTime.toFormat('yyyy-MM-dd');

        // Utiliser formattedDate comme vous le souhaitez
        console.log("formattedDate",formattedDate); // Par exemple, "2024-02-14"
        // Utilisez formattedDate comme vous le souhaitez
       
    } else {
        // Gérer le cas où expDateTime n'est pas une instance de Date
        
        console.log("nest pas instance de date ");
    }
  
      // Envoi de la date formatée au serveur
      const projectData = {
        code: this.composeForm.value.code,
        projectname: this.composeForm.value.projectname,
        speciality: this.composeForm.value.speciality,
        technologies:   technologiesArray,
        description: this.composeForm.value.description,
        exp_date:formattedDate,
      };
  
      // Envoyer les données au serveur
      this.ProjectsService.createProject(this.CompanyId, projectData).subscribe(
        (response) => {
          this.type ='success'  
          console.log('Projet ajouté avec succès :', response);
          if (this.type ='success')   {
            this.openSnackBar(' new project added successfuy', 'Close');
            this.matDialogRef.close();
           }
          
          // Gérer la réponse du serveur si nécessaire
        },
        (error) => {

          if (this.type = 'error')  {
            this.openSnackBar('Error message while adding ', 'Close');
          
         }
          console.error('Erreur lors de l\'ajout du projet :', error);
          // Gérer l'erreur si nécessaire
        }
      );
    } else{
        console.log("date invalide");
      
        
        
    }
















}






onCancel(): void {
  // Fermer le dialogue sans rien faire
  this.matDialogRef.close();
}


    }
    











    




    

