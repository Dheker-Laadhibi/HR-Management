import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { ContactsService } from 'app/modules/admin/interns/contacts.service';
import { ContactsListComponent } from 'app/modules/admin/interns/list/list.component';
import { catchError, throwError } from 'rxjs';
import { InventoryService } from '../Company/inventory/inventory.service';
import { ContactsComponent } from './contacts.component';

export default [


    /** {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'tasks',
    },
    {
        path     : 'tasks',
        component: TasksComponent,
        resolve  : {
           
        }, */
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
