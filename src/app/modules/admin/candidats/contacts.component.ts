import {  Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector       : 'contacts',
    templateUrl    : './contacts.component.html',
    encapsulation  : ViewEncapsulation.None,
    standalone     : true,
    imports        : [RouterOutlet],
})
export class ContactsComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
