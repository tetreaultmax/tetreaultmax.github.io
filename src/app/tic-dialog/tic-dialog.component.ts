import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tic-dialog',
  templateUrl: './tic-dialog.component.html',
  styleUrls: ['./tic-dialog.component.css']
})
export class TicDialogComponent {
	constructor(public dialogRef: MatDialogRef<TicDialogComponent>) { }
	closeDialog(): void {
		this.dialogRef.close();
	  }
}
