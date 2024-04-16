import { ProjectsService } from './../../../../../Services/projects.service';
import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit,  ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { InventoryService } from 'app/modules/admin/project/inventory/inventory.service';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryProduct, InventoryTag, InventoryVendor } from 'app/modules/admin/project/inventory/inventory.types';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { NotesLabelsComponent } from 'app/modules/admin/project/inventory/labels/labels.component';
import { UpdateComponent } from 'app/modules/admin/project/inventory/update/update.component';
import { AddComponent } from 'app/modules/admin/project/inventory/add/add.component';
import { UserData } from 'app/Model/session';
import { ProjectTable } from 'app/Model/projects';



@Component({
    selector       : 'inventory-list',
    templateUrl    : './inventory.component.html',
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
    encapsulation  : ViewEncapsulation.None,
   
    animations     : fuseAnimations,
    standalone     : true,
    imports        : [NgIf, MatProgressBarModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSortModule, NgFor, NgTemplateOutlet, MatPaginatorModule, NgClass, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule, AsyncPipe, CurrencyPipe],
})
export class InventoryListComponent implements OnInit
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;

    page=1;
    limits=10;

    type :any
    flashMessage: 'success' | 'error' | null = null;
    composeForm: FormGroup;
    selectedCompany: ProjectTable | null = null;
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private destroy$ = new Subject<void>();
    projects: any[] = [];
    
    
   

   

    ngOnInit(): void {
        this.fetchProjects();
       
      }
      constructor( private ProjectsService:ProjectsService,
    
        private _fuseConfirmationService: FuseConfirmationService,
        
        private _matDialog: MatDialog,
       // Call fetch() asynchronously to wait for access token

        
        
        ){

           
        }
    openInfosDialog(project: any): void
    {
        const dialogRef = this._matDialog.open(NotesLabelsComponent, {
            autoFocus: false,
            data: { project }
          });
        
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
    }

     /**
    * Open the edit labels dialog
    */
     openEditLabelsDialog(): void
     {
         this._matDialog.open(UpdateComponent, {autoFocus: false});
     }
     //for add 
     openAddDialog() {
        this._matDialog.open(AddComponent, {
            autoFocus: false,
            panelClass: 'custom-dialog'
        });
    }

/* open dialog for dlt*/ 
    openDeleteDialog() {
        this._matDialog.open(UpdateComponent, {
            autoFocus: false,
            panelClass: 'custom-dialog'
        });
    }



    
    fetchProjects(): void {
        console.log('Fetching  projects...');
        this.ProjectsService.getAllProjects(this.CompanyId,this.page,this.limits).subscribe(
            response => {
                console.log('Data received:', response.data.items);
                this.projects = response.data.items;
               
            },  
            error => {
                console.error('Error fetching loan requests:', error);
            }
        );
    }








    ngOnDestroy(): void
    {
        this.destroy$.next();
        this.destroy$.complete();
    }


  
 
   

   

   
}
