import { RoleService } from './../../../../../Services/role.service';
import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
import { InventoryService } from 'app/modules/admin/role/inventory/inventory.service';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryProduct, InventoryTag, InventoryVendor } from 'app/modules/admin/role/inventory/inventory.types';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { NotesLabelsComponent } from 'app/modules/admin/role/inventory/labels/labels.component';
import { UpdateComponent } from 'app/modules/admin/role/inventory/update/update.component';
import { AddComponent } from 'app/modules/admin/role/inventory/add/add.component';
import { UserData } from 'app/Model/session';



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
export class InventoryListComponent implements OnInit, OnDestroy
{
    @ViewChild(MatPaginator) private _paginator: MatPaginator;
    @ViewChild(MatSort) private _sort: MatSort;
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
     userID =this.userData[1].data.user.ID
    page=1;
    limits=10;

    roles: any[] = [];
   
   
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
  
    searchInputControl: UntypedFormControl = new UntypedFormControl();
   
    tags: InventoryTag[];
    tagsEditMode: boolean = false;
   
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: UntypedFormBuilder,
        private _inventoryService: InventoryService,
        private _matDialog: MatDialog,
        private RoleService : RoleService

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
       
       

    this.fetchRoles();

       
    }

    fetchRoles(): void {
        console.log('Fetching Roles...');
        this.RoleService.getAllRoles(this.CompanyId,this.page,this.limits).subscribe(
            response => {
                 // Show a success message
            this.showFlashMessage('success');
                console.log('Roles received:', response.data.items);
                this.roles = response.data.items;
               
            },
            error => {
                console.error('Error fetching Roles', error);
                this.showFlashMessage('error');
            }
        );
    }
    openEditLabelsDialog(role :any): void
    {
        const dialogRef = this._matDialog.open(UpdateComponent, {
            autoFocus: false,
            data: {role}
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
          });
    }
    
   
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
     * Toggle product details
     *
     * @param productId
     */
    
     /**
     * Open the Infos dialog
     */
     

      /**
     * Open the edit labels dialog
     */
     

           /**
     * Open the add dialog
     */
           openAddDialog(): void
           {
               this._matDialog.open(AddComponent, {autoFocus: false});
           }


   

  

    

   
    
    
         
    
   

   
    
   

    
    

    
  

    


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



roleId:string;


 deleteRole(roleId: string): void {
        const confirmation = this._fuseConfirmationService.open({
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
                if (roleId) {

                    this.roleId=roleId;
                    console.log("role id", this.roleId);
                    console.log("CompanyId****", this.CompanyId);
                    this.RoleService.deleteRole(this.CompanyId,this.roleId).subscribe(
                        response => {
                            console.log('Loan request deleted successfully:', response);
                            this.fetchRoles();
                            this.roleId=null
                        },
                        error => {
                            console.error('Error deleting Role :', error);
                        }
                    );
                }
            }
        });
    }

    
}
