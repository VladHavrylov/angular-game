import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-congratulation-modal',
  templateUrl: './congratulation-modal.component.html',
  styleUrl: './congratulation-modal.component.scss'
})
export class CongratulationModalComponent {
  message: string = '';

  constructor(
    private dialogRef: MatDialogRef<CongratulationModalComponent>,
    @Inject(MAT_DIALOG_DATA) data: { message: string }
  ) {
    this.message = data ? data.message : '';
  }

  closeAlert() {
    this.dialogRef.close();
  }
}
