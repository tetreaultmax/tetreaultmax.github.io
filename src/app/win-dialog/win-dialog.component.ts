import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-win-dialog',
  templateUrl: './win-dialog.component.html',
  styleUrls: ['./win-dialog.component.css']
})
export class WinDialogComponent {
	constructor(public dialogRef: MatDialogRef<WinDialogComponent>) { }
	closeDialog(): void {
		this.dialogRef.close();
	  }
}
