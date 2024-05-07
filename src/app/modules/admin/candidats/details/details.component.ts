import { InternService } from './../../../../Services/intern.service';
import { CandidateService } from './../../../../Services/candidate.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

import {  ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ContactsService } from 'app/modules/admin/candidats/contacts.service';
import { Contact, Country, Tag } from 'app/modules/admin/candidats/contacts.types';
import { ContactsListComponent } from 'app/modules/admin/candidats/list/list.component';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from 'app/Model/session';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
    selector       : 'contacts-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,

    standalone     : true,
    imports: [
        MatMenuModule,
        CommonModule,
        MatSnackBarModule, // No comma after MatSnackBarModule
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        NgFor, // This seems like a mistake, should be NgForOf
        FormsModule,
        ReactiveFormsModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        NgClass,
        MatSelectModule,
        MatOptionModule,
        MatDatepickerModule,
        TextFieldModule,
        FuseFindByKeyPipe,
        DatePipe
      ],
})



export class ContactsDetailsComponent implements OnInit
{

    isAccepted: boolean = false;

    type :any
    flashMessage: 'success' | 'error' | null = null;
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
    userId = this.userData[1].data.user.ID|| '';  
  CandidateID: any;
    onCancel(): void {
        // Fermer le dialogue sans rien faire
        this.matDialogRef.close();
      }
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

   

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
   
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: { candidat: any } ,
        private _changeDetectorRef: ChangeDetectorRef,
    private CandidateService:CandidateService,
    private InternService:InternService,
    public matDialogRef: MatDialogRef<ContactsDetailsComponent>,
    
    private _fuseConfirmtionService: FuseConfirmationService,
    )
    {
        
    }
    candidat: any;
    candidatID=this.data.candidat;

    ngOnInit(): void {
        console.log("down we transfered intern");
        console.log("id candidate", this.data.candidat.email);
     console.log("data",this.data);
  
     

        
    }
   
    openSnackBar(message: string, type: string) { 
        this._snackBar.open(message, 'close', {
            duration: 9000,
            verticalPosition: 'top',
            panelClass: [type === 'error' ? 'mat-snack-bar-container-error' : 'mat-snack-bar-container-success'] // Appliquer la classe de couleur en fonction du type
          });
          
      }

    send(): void {
  
    
        
       
        
     
      
          // Envoi de la date formatée au serveur
          const candidateData = {
    
    
        //@name InternsIn */
        adress:this.data.candidat.email,
            firstname: this.data.candidat.firstname,
            lastname: this.data.candidat.lastname,
            educationLevel:this.data.candidat.educationlevel,
            university:this.data.candidat.university,
            email:this.data.candidat.email,


          };
      
          // Envoyer les données au serveur
          this.InternService.addIntern(this.CompanyId,this.userId, candidateData).subscribe(
            (response) => {
              this.type ='success'  
              console.log('intern  adedd avec succès :', response);
              console.log("candidateData",candidateData);
              
              if (this.type ='success')   {
                this.openSnackBar(' new intern  added successfuy', 'Close');
                this.matDialogRef.close();

                this.isAccepted = true;
                console.log(this.isAccepted);
                
                
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
        } 








        deleteRequest(candidateid: string): void {
          const confirmation = this._fuseConfirmtionService.open({
              title: 'Delete role',
              message: 'Are you sure you want to remove this candiate? This action cannot be undone!',
              actions: {
                  confirm: {
                      show: true,
                      label: 'Delete',
                      color: 'warn'
                  },
                  cancel: {
                      show: true,
                      label: 'Cancel'
                  }
              }
          });
  
          confirmation.afterClosed().subscribe(result => {
              if (result === 'confirmed') {
                  if (candidateid) {
                      this.CandidateID=candidateid
                      this.CandidateService.deleteCandidat(this.CompanyId, this.CandidateID).subscribe(
                          response => {
                              console.log('Loan request deleted successfully:', response);
                              window.location.reload();
                              this.CandidateID = null;
                          },
                          error => {
                              console.error('Error deleting loan request:', error);
                          }
                      );
                  }
              }
          });
      }






    
    }










