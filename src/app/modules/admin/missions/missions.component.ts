import {  Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector       : 'tasks',
    templateUrl    : './missions.component.html',
    encapsulation  : ViewEncapsulation.None,

    standalone     : true,
    imports        : [RouterOutlet],
})
export class TasksComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
