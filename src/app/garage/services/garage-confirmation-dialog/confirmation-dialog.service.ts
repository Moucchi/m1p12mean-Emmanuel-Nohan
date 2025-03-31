import {inject, Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogDataInterface} from '../../models/confirmation-dialog/confirmation-dialog-data.interface';
import {ConfirmationDialogComponent} from '../../components/confirmation-dialog/confirmation-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationDialogService {
  private readonly dialog = inject(MatDialog);

  confirm(data: ConfirmationDialogDataInterface) {
    return this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: data
    });
  }}
