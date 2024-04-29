import { CandidateService } from './../../../Services/candidate.service';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, Routes } from '@angular/router';
import { UserData } from 'app/Model/session';
import { ContactsComponent } from 'app/modules/admin/candidats/contacts.component';
import { ContactsService } from 'app/modules/admin/candidats/contacts.service';
import { ContactsDetailsComponent } from 'app/modules/admin/candidats/details/details.component';
import { ContactsListComponent } from 'app/modules/admin/candidats/list/list.component';
import { catchError, of, throwError } from 'rxjs';

/**
 * Contact resolver
 *
 * @param route
 * @param state
 */

const userDataString = localStorage.getItem('userData');
var userData : UserData;
userData = JSON.parse(userDataString);


const CompanyId = userData[1].data.user.workCompanyId || '';
const contactResolver = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const candidateService = inject(CandidateService);
    const router = inject(Router);
// Extract the ID from the route parameters
const id = route.paramMap.get('id');

// Check if the ID exists
if (id) {
    // Fetch the user details
    return candidateService.getCandidat(CompanyId, id).pipe(
        catchError((error) => {
            console.error(error);
            const parentUrl = state.url.split('/').slice(0, -1).join('/');
            router.navigateByUrl(parentUrl);
            return throwError(error);
        })
    );
} else {
    // If no ID is provided, just return an empty observable
    return of(null);
}
};

/**
* Can deactivate contacts details
*
* @param component
* @param currentRoute
* @param currentState
* @param nextState
*/
const canDeactivateContactsDetails = (
component: ContactsDetailsComponent,
currentRoute: ActivatedRouteSnapshot,
currentState: RouterStateSnapshot,
nextState: RouterStateSnapshot) =>
{
// Get the next route
let nextRoute: ActivatedRouteSnapshot = nextState.root;
while ( nextRoute.firstChild )
{
    nextRoute = nextRoute.firstChild;
}

// If the next state doesn't contain '/contacts'
// it means we are navigating away from the
// contacts app
if ( !nextState.url.includes('/contacts') )
{
    // Let it navigate
    return true;
}

// If we are navigating to another user...
if ( nextRoute.paramMap.get('id') )
{
    // Just navigate
    return true;
}


};

export default [
{
    path     : '',
    component: ContactsComponent,
    resolve  : {

    },
    children : [
        {
            path     : '',
            component: ContactsListComponent,
            resolve  : {
                candidats : () => inject(CandidateService).getCandidats(CompanyId),
            },
            children : [
                {
                    path         : ':id',
                    component    : ContactsDetailsComponent,

                },
            ],  
        },
    ],

},

] as Routes;