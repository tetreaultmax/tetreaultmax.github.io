import { Component , Inject, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.css']
})
export class PlayerDialogComponent {
	playerName = '';
	matchingNames: string[] = [];
	constructor(
	  public dialogRef: MatDialogRef<PlayerDialogComponent>,
	  @Inject(MAT_DIALOG_DATA) public data: { row: number, col: number,  allNameData: string[]}
	) {}
  
	closeDialog(): void {
	  this.dialogRef.close();
	}

	// Inside PlayerDialogComponent class
	filterNames(): void {
		this.matchingNames = this.data.allNameData.filter(name => name.toLowerCase().includes(this.playerName.toLowerCase()));
	}
	// Inside PlayerDialogComponent class
	selectName(name: string): void {
		this.playerName = name;
		this.savePlayer();
	}
  
	savePlayer(): void {
	  // Update the players array with the entered player name
	  // this.players[this.data.row][this.data.col] = this.playerName;
	  this.dialogRef.close({ playerName: this.playerName });
	}
}
