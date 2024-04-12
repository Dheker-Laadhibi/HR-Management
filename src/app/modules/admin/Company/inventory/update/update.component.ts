import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserData } from 'app/Model/session';
import { debounceTime, filter, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { CompanieServiceService } from 'app/Services/companie-service.service';

@Component({
    selector       : 'notes-labels',
    templateUrl    : './update.component.html',
    styles: [`
    .custom-snackbar-error {
      background-color: white; // Fond blanc pour les erreurs
      color: red; // Texte en rouge pour les erreurs
    }

    .custom-snackbar-success {
      background-color: white; // Fond blanc pour les succès
      color: green; // Texte en vert pour les succès
    }

    .custom-snackbar-error button,
    .custom-snackbar-success button {
      color: red; // Couleur du bouton en rouge
      font-weight: bold; // Texte en gras
    }
  `],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone     : true,
    imports        : [MatButtonModule, MatDialogModule, MatIconModule, MatFormFieldModule,
         MatInputModule, NgIf, NgFor, FormsModule, AsyncPipe,
         MatSnackBarModule],
})
export class UpdateComponent implements OnInit, OnDestroy
{

    type :any
    flashMessage: 'success' | 'error' | null = null;
  
    userDataString = localStorage.getItem('userData');
    userData: UserData = JSON.parse(this.userDataString);
    CompanyId = this.userData[1].data.user.workCompanyId || '';


    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _snackBar: MatSnackBar,
        private CompanieServiceService: CompanieServiceService ,// Use the loan requests service directly
        public matDialogRef: MatDialogRef<UpdateComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
    )
    {
    }

    saveAndClose(): void {
        this.saveAsDraft();
        this.matDialogRef.close();
    }

    discard(): void {
        // Implement discard logic here if needed
    }

    send(): void {
        if (this.CompanyId) {
            // Si l'ID de l'entreprise est défini
            
            this.CompanieServiceService.deleteCompany(this.CompanyId).subscribe(
                response => {
                    // Gérez la réponse de suppression de l'entreprise ici
                    console.log('Company deleted successfully:', response);
                    this.openSnackBar('Company deleted successfully', 'Close');
                    this.matDialogRef.close();
                },
                error => {
                    // Gérez les erreurs de suppression de l'entreprise ici
                    console.error('Error deleting company:', error);
                    this.openSnackBar('Error deleting company', 'Close');
                }
            );
        } else {
            // Si l'ID de l'entreprise n'est pas défini
            console.error('Company ID is not defined');
            this.openSnackBar('Error: Company ID is not defined', 'Close');
        }
    }
    
    saveAsDraft(): void {
        // Implement saveAsDraft logic here if needed
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    onCancel(): void {
        // Fermer le dialogue sans rien faire
        this.matDialogRef.close();
      }
    /**
     * On init
     */
    ngOnInit(): void
    {

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
    
    openSnackBar(message: string, type: string) { 
        this._snackBar.open(message, 'close', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: [type === 'error' ? 'mat-snack-bar-container-error' : 'mat-snack-bar-container-success'] // Appliquer la classe de couleur en fonction du type
          });
          
      }
    
}
