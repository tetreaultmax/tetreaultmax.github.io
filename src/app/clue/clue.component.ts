import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-clue',
  templateUrl: './clue.component.html',
  styleUrls: ['./clue.component.css']
})
export class ClueComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ClueComponent>) { }
}
