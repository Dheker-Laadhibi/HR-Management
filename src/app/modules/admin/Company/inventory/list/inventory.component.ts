import { ApiResponse } from './../../../../../Model/apiresponse';
import { items } from './../../../../../mock-api/apps/file-manager/data';

import { CompanieServiceService } from './../../../../../Services/companie-service.service';
import { AsyncPipe, CurrencyPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { InventoryService } from 'app/modules/admin/Company/inventory/inventory.service';
import { InventoryBrand, InventoryCategory, InventoryPagination, InventoryProduct, InventoryTag, InventoryVendor } from 'app/modules/admin/Company/inventory/inventory.types';
import { debounceTime, map, merge, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { NotesLabelsComponent } from 'app/modules/admin/Company/inventory/labels/labels.component';
import { UpdateComponent } from 'app/modules/admin/Company/inventory/update/update.component';
import { AddComponent } from 'app/modules/admin/Company/inventory/add/add.component';
import { Companies  } from 'app/Model/companies';
import { CompaniesPagination } from 'app/Model/CompaniesPagination';


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
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations     : fuseAnimations,
    standalone     : true,
    imports        : [NgIf, MatProgressBarModule, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatSortModule, NgFor, NgTemplateOutlet, MatPaginatorModule, NgClass, MatSlideToggleModule, MatSelectModule, MatOptionModule, MatCheckboxModule, MatRippleModule, AsyncPipe, CurrencyPipe],
})
export class InventoryListComponent

{

   


    
   
constructor( private CompanieServ:CompanieServiceService){
  
}
companies: any[]= [];
ApiResponse:ApiResponse;
public CompaniesPagination:CompaniesPagination;

currentPage: number = 1;
itemsPerPage: number = 10;

ngOnInit(): void {
    // Initialisez les valeurs par défaut de la pagination
    
    this.getCompanies(); // Chargez les entreprises avec les valeurs par défaut
  }

   getCompanies(): void {
    this.CompanieServ.getCompanies()
      .subscribe((response) => {


this.ApiResponse=response;
        //this.companies =  response;
        //console.log(this.companies);
        console.log(response);
        this.companies= response.data.items;
        console.log("items",this.ApiResponse.data[0]);
        
        
        console.log('Data received:', response.data.items);


       console.log( response[1]);
       
      
      //  console.log(response.da);
        
       
        
//console.log("tableau companies",this.CompaniesPagination);
console.log("companies",this.companies);

//


      }, (error) => {
        console.error('Error fetching allcompanies:', error);
      });
  }
 












}
