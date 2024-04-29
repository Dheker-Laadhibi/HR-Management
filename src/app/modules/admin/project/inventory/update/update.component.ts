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
import { ProjectsService } from './../../../../../Services/projects.service';
import { UserData } from 'app/Model/session';
@Component({
    selector       : 'notes-labels',
    templateUrl    : './update.component.html',
    encapsulation  : ViewEncapsulation.None,
  
    standalone     : true,
    imports        : [MatButtonModule, MatSnackBarModule, ReactiveFormsModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, FormsModule, AsyncPipe,MatSnackBarModule],
})
export class UpdateComponent implements OnInit, OnDestroy
{    projectId: string;
    composeFormF: FormGroup;
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
        private ProjectsService:ProjectsService,
    )
    {
      this.projectId = this.data.projectId;
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
            projectname: ['', Validators.required],
            description: ['', Validators.required],
            technologies: [[]],
            code: ['', Validators.required],
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

// Méthode pour convertir les données entrées en un tableau de chaînes
convertToTechnologiesArray(technologiesString: string): string[] {
    // Séparez les technologies saisies par l'utilisateur en utilisant une virgule ou un autre séparateur de votre choix
    return technologiesString.split(',').map(tech => tech.trim());
  }

  send(): void {
    const technologiesArray = this.convertToTechnologiesArray(this.composeFormF.value.technologies);
      // Envoi de la date formatée au serveur
      const projectData = {
        code: this.composeFormF.value.code,
        projectname: this.composeFormF.value.projectname,
        technologies:   technologiesArray,
        description: this.composeFormF.value.description,
        
      };
  
      // Envoyer les données au serveur
      this.ProjectsService.updateProject(this.CompanyId,this. projectId,projectData).subscribe(
        (response) => {
          this.type ='success'  
          console.log('Projet updated avec succès :', response);
          if (this.type ='success')   {
            this.openSnackBar(' new project updated successfuy', 'Close');
            this.matDialogRef.close();
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
