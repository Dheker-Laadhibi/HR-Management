import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { AnalyticsComponent } from 'app/modules/admin/dashboard/dashboard.component';
import { AnalyticsService } from 'app/modules/admin/dashboard/dashboard.service';

export default [
    {
        path     : '',
        component: AnalyticsComponent,
        resolve  : {
            data: () => inject(AnalyticsService).getData(),
        },
    },
] as Routes;
