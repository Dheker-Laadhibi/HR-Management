import { CandidateService } from './../../../../Services/candidate.service';
import { AsyncPipe, DOCUMENT, I18nPluralPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ContactsService } from 'app/modules/admin/candidats/contacts.service';

import { filter, fromEvent, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Contact, Country } from '../contacts.types';
import { UserData } from 'app/Model/session';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from '../add/labels.component';
import { ContactsDetailsComponent } from '../details/details.component';

@Component({
    selector       : 'contacts-list',
    templateUrl    : './list.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports        : [MatSidenavModule, RouterOutlet, NgIf, MatFormFieldModule, MatIconModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, NgFor, NgClass, RouterLink, AsyncPipe, I18nPluralPipe],
})
export class ContactsListComponent implements OnInit, OnDestroy
{
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;

 

    contacts$: Observable<Contact[]>;

    contactsCount: number = 0;
    contactsTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    countries: Country[];
    drawerMode: 'side' | 'over';
    searchInputControl: UntypedFormControl = new UntypedFormControl();
    selectedContact: Contact;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
   
   
    candidats    : any[];
    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _contactsService: ContactsService,
        @Inject(DOCUMENT) private _document: any,
    
        private _fuseMediaWatcherService: FuseMediaWatcherService,
 
        private _matDialog: MatDialog,
     
        private CandidateService:CandidateService,
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
        console.log("company ID ",this.CompanyId);
        
        this.fetchCandidates();
       
       


    }

    
    openInfosDialog(candidat: any): void
    {
        const dialogRef = this._matDialog.open(ContactsDetailsComponent, {
            autoFocus: false,
            data: { candidat }
          });
        
          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



    fetchCandidates(): void {
        console.log('Fetching Candidates...');
        this.CandidateService.getCandidats(this.CompanyId).subscribe(
            response => {
                console.log('candidat received :', response.data.items);
                this.candidats = response.data.items;
            },
            error => {
                console.error('Error fetching candidates:', error);
            }
        );
    } 

    

    /**
     * Create contact
     */
    createCandidate(): void
    {
        this._matDialog.open(AddComponent, {autoFocus: false});
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
}