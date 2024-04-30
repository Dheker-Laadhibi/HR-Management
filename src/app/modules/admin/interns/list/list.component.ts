import { InternService } from './../../../../Services/intern.service';
import { AsyncPipe, DOCUMENT, I18nPluralPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UserData } from 'app/Model/session';
import { ContactsService } from 'app/modules/admin/interns/contacts.service';
import { Contact, Country, Tag } from 'app/modules/admin/interns/contacts.types';
import { filter, fromEvent, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ContactsDetailsComponent } from '../details/details.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { AddComponent } from '../add/add.component';
import { UpdateComponent } from '../update/update.component';

@Component({
    selector       : 'contacts-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    styles         : [
        /* language=SCSS */
        `
            .inventory-grid {
                grid-template-columns: 48px auto 40px;

                @screen sm {
                    grid-template-columns: 48px auto 112px 72px;
                }

                @screen md {
                    grid-template-columns: 48px 112px auto 112px 72px;
                }

                @screen lg {
                    grid-template-columns: 48px 112px auto 112px 96px 96px 72px;
                }
            }
        `,
    ],
    standalone     : true,
    imports        : [MatSidenavModule,  MatProgressBarModule,
        MatSortModule,RouterOutlet, NgIf, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, NgFor, NgClass, RouterLink, AsyncPipe, I18nPluralPipe],
})
export class ContactsListComponent  implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    drawerMode: 'side' | 'over';
  selectedMission: any;
  tags: Tag[];
  internID:string
 interns: any[];
  missionsCount: any = {
    completed: 0,
    incomplete: 0,
    total: 0,
    };

    private _unsubscribeAll: Subject<any> = new Subject<any>();
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
    userId = this.userData[1].data.user.ID|| '';  
    /**
     * Constructor
     */
    constructor(
      
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,

        private _fuseConfirmtionService: FuseConfirmationService,
        private _matDialog: MatDialog,
        private InternService: InternService     
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
         // Chargez les missions initiales
    this.loadInterns();


    
    }
  


  


    deleteIntern(internId: string): void {
        const confirmation = this._fuseConfirmtionService.open({
            title: 'Delete Intern',
            message: 'Are you sure you want to remove this Intern? This action cannot be undone!',
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
                if (internId) {
                    this.internID=internId
                    this.InternService.deleteIntern(this.CompanyId,this.internID).subscribe(
                        response => {
                            console.log('intern  deleted successfully:', response);
                            this.loadInterns();
                            this.internID = null;
                        },
                        error => {
                            console.error('Error deleting intern  :', error);
                        }
                    );
                }
            }
        });
    }

    openInfosDialog(intern: any): void
    {
        const dialogRef = this._matDialog.open(ContactsDetailsComponent, {
            autoFocus: false,
            data: { intern }
          });
        
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
    }

   
     openEditLabelsDialog(intern: any): void
     {
        console.log('Updating intern with ID:', intern);
        this._matDialog.open(UpdateComponent, {
            autoFocus: false,
            data: {intern}
         
        });
        
     }
     //for add 
     openAddDialog() {
        this._matDialog.open(AddComponent, {
            autoFocus: false,
            panelClass: 'custom-dialog'
        });
    }

/* open dialog for dlt*/ 
   


page=1;
limit=10;


    
    loadInterns(): void {
        console.log('Fetching  interns...');
        this.InternService.getAllInterns(this.CompanyId,this.page,this.limit).subscribe(
            response => {
                console.log('Data received:', response.data.items);
                this.interns = response.data.items;
                console.log("interns ",this.interns);
               
            },  
            error => {
                console.error('Error fetching interns:', error);
            }
        );
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

   

}


   
  

  



    
   

