import { Component , Inject, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.css']
})
export class TeamDialogComponent {
	team = '';
	allTeams = ["ANA", "ARI", "BOS", "BUF", "CGY", "CAR", "CHI", "COL", "CBJ", "DAL", "DET", "EDM", "FLA", "LAK", "MIN", "MTL", "NSH", "NJD", "NYI", "NYR", "OTT", "PHI", "PIT", "SJS", "SEA", "STL", "TBL", "TOR", "VAN", "VGK", "WSH", "WPG"];

	constructor(
		public dialogRef: MatDialogRef<TeamDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { isRow: boolean, place: number}
	  ) {
	  }

	  closeDialog(): void {
		this.dialogRef.close();
	  }

	  // Inside PlayerDialogComponent class
	selectTeam(name: string): void {
		this.team = name;
		this.saveTeam();
	}
  
	saveTeam(): void {
	  // Update the players array with the entered player name
	  // this.players[this.data.row][this.data.col] = this.playerName;
	  this.dialogRef.close({ selectTeam: this.team });
	}
}
