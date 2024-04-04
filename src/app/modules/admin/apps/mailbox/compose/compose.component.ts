

    import { NgIf } from '@angular/common';
    import { Component, OnInit, ViewEncapsulation } from '@angular/core';
    import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators,FormBuilder, FormGroup } from '@angular/forms';
    import { MatButtonModule } from '@angular/material/button';
    import { MatDialogRef } from '@angular/material/dialog';
    import { MatFormFieldModule } from '@angular/material/form-field';
    import { MatIconModule } from '@angular/material/icon';
    import { MatInputModule } from '@angular/material/input';
    import { QuillEditorComponent } from 'ngx-quill';
    import { MatSelectModule } from '@angular/material/select';
    import { ChangeDetectionStrategy } from '@angular/core';
    import { MatCheckboxModule } from '@angular/material/checkbox';



    @Component({
        selector     : 'mailbox-compose',
        templateUrl  : './compose.component.html',
        changeDetection: ChangeDetectionStrategy.OnPush,
        encapsulation: ViewEncapsulation.None,
        standalone   : true,
        imports      : [    MatCheckboxModule,  MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, QuillEditorComponent,MatSelectModule],

    })
export class MailboxComposeComponent implements OnInit {
  composeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.composeForm = this.fb.group({
      type1: [false],
      type2: [false],
      type3: [false],
      type4: [false],
      amount1: [''],
      reason1: [''],
      start2: [''],
      end2: [''],
      start3: [''],
      return3: [''],
      amount4: [''],
      duration4: [''],
      interestRate4: [''],
      reason4: [''],
      documentPath4: ['']
    });
  }

  saveAndClose(): void {
    // Logic to save and close the form
  }

  discard(): void {
    // Logic to discard the form
  }

  saveAsDraft(): void {
    // Logic to save the form as draft
  }

  send(): void {
    // Logic to send the form
  }
}
