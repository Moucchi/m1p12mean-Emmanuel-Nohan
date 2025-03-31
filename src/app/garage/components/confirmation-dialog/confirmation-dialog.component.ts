import {Component, inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {ConfirmationDialogDataInterface} from '../../models/confirmation-dialog/confirmation-dialog-data.interface';

@Component({
  selector: 'mean-confirmation-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);
  readonly data = inject<ConfirmationDialogDataInterface>(MAT_DIALOG_DATA);

  confirm() {
    this.data.onConfirm();
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
}
