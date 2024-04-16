import { AsyncPipe, CommonModule, NgFor, NgIf } from '@angular/common';
import {  ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProjectTable } from 'app/Model/projects';
import { debounceTime, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
    selector       : 'notes-labels',
    templateUrl    : './labels.component.html',
    styles         : [
        /* language=SCSS */
    `
    .custom-title {
        color: red;
    }
    `,
    ],
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports        : [MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule, MatInputModule, NgIf, NgFor, FormsModule, AsyncPipe , CommonModule],
})
export class NotesLabelsComponent implements OnInit, OnDestroy
{
    
   
    
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        // injecter des données dans un dialogue.
        /*Cela signifie que lorsque ce dialogue est instancié, 
        il recevra des données sous forme d'objet avec une propriété project, qui sera de type ProjectTable.*/ 
        @Inject(MAT_DIALOG_DATA) public data: { project: ProjectTable } 
        
    )
    {
    }


    /**
     * On init
     */
    ngOnInit(): void
    {console.log("down we transfered project");
    console.log( "dateeeeeeee",this.data.project );
        console.log( "dateeeeeeee labe",this.data.project.expdate );
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

    /**
     * Add label
     *
     * @param title
     */
    addLabel(title: string): void
    {
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
