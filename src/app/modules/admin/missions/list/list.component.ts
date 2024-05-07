import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDragPreview, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { AsyncPipe, CommonModule, CurrencyPipe, DatePipe, DOCUMENT, NgClass, NgFor, NgIf, NgTemplateOutlet, TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { UserData } from 'app/Model/session';
import { MissionOrdersService } from 'app/Services/mission-orders.service';
import { TasksService } from 'app/modules/admin/missions/missions.service';
import { Tag, Task } from 'app/modules/admin/missions/missions.types';
import { filter, fromEvent, map, Subject, Subscription, takeUntil } from 'rxjs';
import { AddComponent } from '../add/add.component';

import { UpdateComponent } from '../update/update.component';

@Component({
    selector       : 'tasks-list',
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
                .nowrap {
        white-space: nowrap;
    }
            }
        `,
    ],
    standalone     : true,
    imports        : [NgIf, MatProgressBarModule,CommonModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSortModule, NgFor, NgTemplateOutlet, MatPaginatorModule, NgClass, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule, AsyncPipe, CurrencyPipe],
})
export class TasksListComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

    drawerMode: 'side' | 'over';
  selectedMission: any;
  tags: Tag[];
  missionID:string
  missions: any[];
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
        private _missionService: MissionOrdersService 
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
    this.loadMissions();


    
    }
  
    deleteRequest(missionId: string): void {
        const confirmation = this._fuseConfirmtionService.open({
            title: 'Delete role',
            message: 'Are you sure you want to remove this role? This action cannot be undone!',
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
                if (missionId) {
                    this.missionID=missionId
                    this._missionService.deleteMission(this.CompanyId, this.missionID).subscribe(
                        response => {
                            console.log('Loan request deleted successfully:', response);
                            this.loadMissions();
                            this.missionID = null;
                        },
                        error => {
                            console.error('Error deleting loan request:', error);
                        }
                    );
                }
            }
        });
    }



   
     openEditLabelsDialog(mission: any): void
     {
        console.log('Updating project with ID:', mission);
        this._matDialog.open(UpdateComponent, {
            autoFocus: false,
            data: {mission}
         
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
   

formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}



    
loadMissions(): void {
    console.log('Fetching projects...');
    this.missionsSubscription = this._missionService.getAllMissions(this.CompanyId).pipe(
        map(response => {
            // Map response data here
            return response.data.items.map((item: any) => {
                // Format date fields here if needed
                item.StartDate = this.formatDate(item.StartDate);
                return item;
            });
        })
    ).subscribe(
        missions => {
            console.log('Data received:', missions);
            this.missions = missions;
        },
        error => {
            console.error('Error fetching missions:', error);
        }
    );
}

    private missionsSubscription: Subscription | undefined;



    getOneMission(id: string): void {
        // Récupérez une seule mission à partir du serveur
        this._missionService.getOneMission(this.CompanyId, id).subscribe((mission) => {
          // Mettez à jour la mission sélectionnée
          this.selectedMission = mission;
          // Marquez pour le changement de détection
          this._changeDetectorRef.markForCheck();
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

   

      }


   
  

  

