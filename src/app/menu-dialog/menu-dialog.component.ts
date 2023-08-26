import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css']
})
export class MenuDialogComponent {
	constructor(public dialogRef: MatDialogRef<MenuDialogComponent>) { }
	closeDialog(): void {
		this.dialogRef.close();
	  }
}
