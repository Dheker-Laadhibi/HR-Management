import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'dashboard'},

    // Redirect signed-in user to the '/dashboard'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect-user', pathMatch : 'full', redirectTo: 'dashboard'},
    {path: 'signed-in-redirect-candidate', pathMatch : 'full', redirectTo: 'projects'},

    // Auth routes for guests
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-in-C', loadChildren: () => import('app/modules/auth/sign_in_Candidat/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'sign-out-C', loadChildren: () => import('app/modules/auth/sign-out-C/sign-out-C.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
            {path: 'example', loadChildren: () => import('app/modules/admin/example/example.routes')},
            {path: 'projects', loadChildren: () => import('app/modules/admin/projects/projects.routes')},
            {path: 'profile', loadChildren: () => import('app/modules/admin/profile/profile.routes')},
            {path: 'qcm', loadChildren: () => import('app/modules/admin/qcm/qcm.routes')},
            {path: 'mailbox', loadChildren: () => import('app/modules/admin/apps/mailbox/mailbox.routes')},
            {path: 'users', loadChildren: () => import('app/modules/admin/users/contacts.routes')},
            {path: 'candidats', loadChildren: () => import('app/modules/admin/candidats/contacts.routes')},
            {path: 'interns', loadChildren: () => import('app/modules/admin/interns/contacts.routes')},
            {path: 'missions', loadChildren: () => import('app/modules/admin/missions/missions.routes')},
            {path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboard/dashboard.routes')},
            {path: 'tests', loadChildren: () => import('app/modules/admin/tests/tests.routes')},
            {path: 'company', loadChildren: () => import('app/modules/admin/Company/company.routes')},
            {path: 'role', loadChildren: () => import('app/modules/admin/role/role.routes')},
            {path: 'project', loadChildren: () => import('app/modules/admin/project/project.routes')},

        ]
    }
];
