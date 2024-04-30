import { CandidateService } from './../../../Services/candidate.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { UserData } from 'app/Model/session';
import { ContactsComponent } from 'app/modules/admin/candidats/contacts.component';
import { ContactsService } from 'app/modules/admin/candidats/contacts.service';
import { ContactsDetailsComponent } from 'app/modules/admin/candidats/details/details.component';
import { ContactsListComponent } from 'app/modules/admin/candidats/list/list.component';
import { catchError, of, throwError } from 'rxjs';
import { InventoryService } from '../Company/inventory/inventory.service';

export default [

    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'contacts',
    },
        {
            path     : 'contacts',
            component: ContactsComponent,
            resolve  : {
               
            },
        children : [
           
             
                    {
                        path         : '',
                        component    : ContactsListComponent,
                        resolve      : {
                            brands    : () => inject(InventoryService).getBrands(),
                            categories: () => inject(InventoryService).getCategories(),
                            products  : () => inject(InventoryService).getProducts(),
                            tags      : () => inject(InventoryService).getTags(),
                            vendors   : () => inject(InventoryService).getVendors(),
                            
                        },
                  
                    },
                ],
            },


] as Routes;