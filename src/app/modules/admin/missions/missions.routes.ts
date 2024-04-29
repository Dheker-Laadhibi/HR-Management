import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';

import { TasksListComponent } from 'app/modules/admin/missions/list/list.component';
import { TasksComponent } from 'app/modules/admin/missions/missions.component';
import { TasksService } from 'app/modules/admin/missions/missions.service';
import { catchError, throwError } from 'rxjs';
import { InventoryService } from '../Company/inventory/inventory.service';



export default [
    {
        path      : '',
        pathMatch : 'full',
        redirectTo: 'tasks',
    },
    {
        path     : 'tasks',
        component: TasksComponent,
        resolve  : {
           
        },
        children : [
            {
                path     : '',
                component: TasksListComponent,
                resolve  : {
                    brands    : () => inject(InventoryService).getBrands(),
                    categories: () => inject(InventoryService).getCategories(),
                    products  : () => inject(InventoryService).getProducts(),
                    tags      : () => inject(InventoryService).getTags(),
                    vendors   : () => inject(InventoryService).getVendors(),
                }
            },
        ],
    },
] as Routes;
