import {  Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector       : 'inventory',
    templateUrl    : './inventory.component.html',
    encapsulation  : ViewEncapsulation.None,

    standalone     : true,
    imports        : [RouterOutlet],
})
export class InventoryComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
