import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-validation-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './validation-dialog.component.html',
  styleUrl: './validation-dialog.component.css'
})
export class ValidationDialogComponent {
  dialogRef = inject(MatDialogRef<ValidationDialogComponent>)

  onCancel(): void {
    this.dialogRef.close(false); 
  }

  onConfirm(): void {
    this.dialogRef.close(true); 
  }
}
