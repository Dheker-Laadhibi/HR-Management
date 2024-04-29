import { InternService } from './../../../../Services/intern.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { TextFieldModule } from '@angular/cdk/text-field';
import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

import {  ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FuseFindByKeyPipe } from '@fuse/pipes/find-by-key/find-by-key.pipe';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { ContactsService } from 'app/modules/admin/interns/contacts.service';
import { Contact, Country, Tag } from 'app/modules/admin/interns/contacts.types';
import { ContactsListComponent } from 'app/modules/admin/interns/list/list.component';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserData } from 'app/Model/session';
import { Observable, of } from 'rxjs';

@Component({
    selector       : 'contacts-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
   
    standalone     : true,
    imports        : [NgIf,MatMenuModule, MatButtonModule, MatTooltipModule, RouterLink, MatIconModule, NgFor, FormsModule, ReactiveFormsModule, MatRippleModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, NgClass, MatSelectModule, MatOptionModule, MatDatepickerModule, TextFieldModule, FuseFindByKeyPipe, DatePipe],
})



export class ContactsDetailsComponent  implements OnInit
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    

{

    intern$: Observable<any>;
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';
    userId = this.userData[1].data.user.ID|| '';  
 /**
     * Constructor
     */
 constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private InternService:InternService,
    public matDialogRef: MatDialogRef<ContactsDetailsComponent>,
    // injecter des données dans un dialogue.
    /*Cela signifie que lorsque ce dialogue est instancié, 
    il recevra des données sous forme d'objet avec une propriété project, qui sera de type ProjectTable.*/ 
    @Inject(MAT_DIALOG_DATA) public data: { intern: any } ,
    
)
{



}

    intern: any;
    internID=this.data.intern;

    ngOnInit(): void {
        console.log("down we transfered intern");
        console.log("id intern", this.data.intern);
     console.log("data",this.data);

     
 // Fetch intern data
 this.getOneIntern();
 setInterval(() => {
   this.intern = this.getOneIntern();
}, 7000);
        
    }
    

    getOneIntern(): void {
        // Retrieve intern data asynchronously
        this.InternService.getOneIntern(this.CompanyId, this.internID).subscribe((response) => {
            // Update intern data
            this.intern = response;
            console.log("intern fetched", this.intern);
            console.log(this.intern.data.firstname);
            
    
            // Explicitly trigger change detection after data is fetched
            this._changeDetectorRef.detectChanges();


           
        });
    }

    onCancel(): void {
        this.intern=null
        // Fermer le dialogue sans rien faire
        this.matDialogRef.close();
        
      }






    
   
      
}
