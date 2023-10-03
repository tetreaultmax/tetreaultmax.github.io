import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayerDialogComponent } from './player-dialog/player-dialog.component';
import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';
import { WinDialogComponent } from './win-dialog/win-dialog.component';
import { TicDialogComponent } from './tic-dialog/tic-dialog.component';
import { TeamDialogComponent } from './team-dialog/team-dialog.component';

interface NhlAbrvDictionary {
	[key: string]: string;
  }
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'sudoku-nhl';
  all_nhl_teams = ["ANA", "ARI", "BOS", "BUF", "CGY", "CAR", "CHI", "COL", "CBJ", "DAL", "DET", "EDM", "FLA", "LAK", "MIN", "MTL", "NSH", "NJD", "NYI", "NYR", "OTT", "PHI", "PIT", "SJS", "SEA", "STL", "TBL", "TOR", "VAN", "VGK", "WSH", "WPG"];
  dictNhlAbrv: NhlAbrvDictionary = {
	"ANA": "Anaheim Ducks",
	"ARI": "Arizona Coyotes",
	"BOS": "Boston Bruins",
	"BUF": "Buffalo Sabres",
	"CGY": "Calgary Flames",
	"CAR": "Carolina Hurricanes",
	"CHI": "Chicago Blackhawks",
	"COL": "Colorado Avalanche",
	"CBJ": "Columbus Blue Jackets",
	"DAL": "Dallas Stars",
	"DET": "Detroit Red Wings",
	"EDM": "Edmonton Oilers",
	"FLA": "Florida Panthers",
	"LAK": "Los Angeles Kings",
	"MIN": "Minnesota Wild",
	"MTL": "Montréal Canadiens",
	"NSH": "Nashville Predators",
	"NJD": "New Jersey Devils",
	"NYI": "New York Islanders",
	"NYR": "New York Rangers",
	"OTT": "Ottawa Senators",
	"PHI": "Philadelphia Flyers",
	"PIT": "Pittsburgh Penguins",
	"SJS": "San Jose Sharks",
	"SEA": "Seattle Kraken",
	"STL": "St. Louis Blues",
	"TBL": "Tampa Bay Lightning",
	"TOR": "Toronto Maple Leafs",
	"VAN": "Vancouver Canucks",
	"VGK": "Vegas Golden Knights",
	"WSH": "Washington Capitals",
	"WPG": "Winnipeg Jets"
	} 
  grid = [1, 2, 3]; // Grid rows and columns
  selectedSize: string = '3x3'; // Default grid size
  players: { [key: number]: { [key: number]: string } } = {};
  randomCol: string[] = [];
  randomRow : string[] = [];
  jsonData: any;
  guess: string = "";
  @Output() playerNameChange = new EventEmitter<{ playerName: string }>();
  findGuess: any;
  cellBackgrounds: string[][] = [];
  tictactoe: string[][] = [];
  cellColors: string[][] = [];
  filteredPlayers = [];
  currentRow = -1;
  currentCol = -1;
  allNames: any[] = [];
  ticTacToeMode: boolean = false;
  chooseMode = false;
  currentPlayer = 'Blue';
  blockedGame: boolean = false;
  nbSelectedTeams: number = 0;
  url_image = "https://cms.nhl.bamgrid.com/images/headshots/current/168x168/"
  

  constructor(private dialog: MatDialog, private menuDialog: MatDialog, private winDialog: MatDialog, private ticDialog: MatDialog, private teamDialog: MatDialog) {
    this.updateGridSize();
	// read a json file
	fetch('../assets/nhl_players.json')
  		.then(response => response.json())
  		.then(jsonData => {
    	// Access the data stored in the variable
		this.jsonData = jsonData;
		for (let i = 0; i < jsonData.length; i++) {
			let player = jsonData[i];
			this.allNames.push([player["Player Name"], player["First Season"], player["Last Season"]]);
		}	
  	})
  	.catch(error => {
    	console.error('Error fetching JSON file:', error);
  	});
  }

  toggleTicTacToe() {
    this.ticTacToeMode = !this.ticTacToeMode;
	this.selectedSize = '3x3';
	this.reset();
  }

  getCellColor(row: number, col: number): string {
	if (this.ticTacToeMode){
		return this.tictactoe[row - 1][col - 1];
	}
	else{
		return this.cellColors[row - 1][col - 1];
	}
}

  sizeGridUp(){
	if (this.selectedSize == '3x3'){
		this.selectedSize = '4x4';
		this.updateGridSize();
	}
	else if (this.selectedSize == '4x4'){
		this.selectedSize = '5x5';
		this.updateGridSize();
	}
  }

  sizeGridDown(){
	if (this.selectedSize == '5x5'){
		this.selectedSize = '4x4';
		this.updateGridSize();
	}
	else if (this.selectedSize == '4x4'){
		this.selectedSize = '3x3';
		this.updateGridSize();
	}
	}



  updateGridSize() {
    const [rows, cols] = this.selectedSize.split('x').map(Number);
    this.grid = Array(rows).fill(0).map((_, index) => index + 1);
    this.initGrid(cols);
	this.randomTeams();
	// Initialize the cellBackgrounds array with empty strings for all cells
	for (let row = 0; row < rows; row++) {
		this.cellBackgrounds[row] = [];
		this.tictactoe[row] = [];
		this.cellColors[row] = [];
		for (let col = 0; col < cols; col++) {
			this.cellBackgrounds[row][col] = '';
			this.tictactoe[row][col] = '';
			this.cellColors[row][col] = '';
		}
	}
  }

  randomTeams(){
	const [rows, cols] = this.selectedSize.split('x').map(Number);
	const nbTeams = rows + cols;
	let randomTeams = ["", "","","","",""];
	for (let i = 0; i < nbTeams; i++) {
		let name = (this.all_nhl_teams[Math.floor(Math.random() * this.all_nhl_teams.length)]);
		while (randomTeams.includes(name)) {
			name = (this.all_nhl_teams[Math.floor(Math.random() * this.all_nhl_teams.length)]);
		}
		randomTeams[i] = name;

	}
	this.randomCol = randomTeams.slice(0, cols);
	this.randomRow = randomTeams.slice(cols, nbTeams + 1);
  }
  initGrid(cols: number) {
    for (let i = 1; i <= this.grid.length; i++) {
      this.players[i] = {};
      for (let j = 1; j <= cols; j++) {
        this.players[i][j] = '';
      }
    }
  }
  

  isInTeams(row: number, col: number){
	const team1 = this.randomCol[col - 1];
	const team2 = this.randomRow[row - 1];
	const arrayTeam = this.findGuess["Teams"].split(", ");
	const playerId = this.findGuess["Player ID"];
	const isConditionMet = arrayTeam.includes(this.dictNhlAbrv[team1]) && arrayTeam.includes(this.dictNhlAbrv[team2]);

	if (isConditionMet) {
		this.cellBackgrounds[row - 1][col - 1] = this.url_image + playerId + "@2x.jpg"; // Set the background color for the current cell
		this.cellColors[row - 1][col - 1] = 'green';
		// if all cells are filled
		if (this.cellColors.every((row) => row.every((cell) => cell === 'green'))) {
			this.openWin();
		}

		if (this.ticTacToeMode){
			if (this.currentPlayer === 'Blue'){
				this.tictactoe[row - 1][col - 1] = 'blue';
			}
			else{
				this.tictactoe[row - 1][col - 1] = 'red';
			}
			// Check if the player won the  game of tic tac toe
			const winner = this.checkForWinner();
			if (winner) {
				this.openTic();
			} 			
			this.currentPlayer = this.currentPlayer === 'Blue' ? 'Red' : 'Blue';	
		}
	} else {
		this.cellBackgrounds[row - 1][col - 1] = ''; // Clear the background color for the current cell
		this.cellColors[row - 1][col - 1] = '';
		this.players[row][col] = '';
		if (this.ticTacToeMode){
			this.tictactoe[row - 1][col - 1] = '';
			this.currentPlayer = this.currentPlayer === 'Blue' ? 'Red' : 'Blue';
		}
	}
  }

  checkForWinner(): string | null {
	let color = this.currentPlayer === 'Blue' ? 'blue' : 'red';
	for (let i = 0; i < 3; i++) {
	if (
		this.tictactoe[i][0] === color &&
		this.tictactoe[i][1] === color &&
		this.tictactoe[i][2] === color
	) {
		return color; // Winner found
	}
	if (
		this.tictactoe[0][i] === color &&
		this.tictactoe[1][i] === color &&
		this.tictactoe[2][i] === color
	) {
		return color; // Winner found
	}
	}

	// Check diagonals
	if (
	this.tictactoe[0][0] === color &&
	this.tictactoe[1][1] === color &&
	this.tictactoe[2][2] === color
	) {
	return color; // Winner found
	}
	if (
	this.tictactoe[0][2] === color &&
	this.tictactoe[1][1] === color &&
	this.tictactoe[2][0] === color
	) {
	return color; // Winner found
	}
	
  
	return null; // No winner found
  }
  

  findPlayers(): boolean{
	for (let i = 0; i < this.jsonData.length; i++) {
		let player = this.jsonData[i];
		if (player["Player Name"] == this.guess){
			this.findGuess = player;
			return true;
		}
	}
	return false;
  }


  reset() {
	this.updateGridSize();
	this.blockedGame = false;
	this.chooseMode = false;
	this.nbSelectedTeams = 0;
  }

  chooseTeam(){
	this.updateGridSize();
	this.randomCol = ["interr", "interr", "interr"];
	this.randomRow = ["interr", "interr", "interr"];
	this.chooseMode = true;
	this.blockedGame = true;
	this.nbSelectedTeams = 0;
  }


  updatePos(row: number, col: number){
	this.currentRow = row;
	this.currentCol = col;
  }

  openTic(): void {
    const dialogRef = this.menuDialog.open(TicDialogComponent, {
      width: '400px', // You can customize the width
      disableClose: true, // Prevents closing the dialog by clicking outside or pressing ESC
    });
	dialogRef.afterClosed().subscribe(result => {
		this.blockedGame = true;
	});
	}

  openMenu(): void {
    const dialogRef = this.menuDialog.open(MenuDialogComponent, {
      width: '400px', // You can customize the width
      disableClose: false, // Prevents closing the dialog by clicking outside or pressing ESC
    });
  }

  openWin(): void {
	const dialogRef = this.winDialog.open(WinDialogComponent, {
	  width: '400px', // You can customize the width
	  disableClose: true, // Prevents closing the dialog by clicking outside or pressing ESC
	});
  }

  openDialogTeam(isRow: boolean, place: number){
	const dialogRef = this.dialog.open(TeamDialogComponent, {
		data: { isRow, place },
	  });

	  dialogRef.afterClosed().subscribe(result => {
		if (result) {
			if (this.randomRow.includes(result.selectTeam) || this.randomCol.includes(result.selectTeam)){
				return;
			}
			this.nbSelectedTeams++;
		  if (isRow){
			// Check if the team is already selected
			
			this.randomRow[place - 1] = result.selectTeam;
		  }
		  else{
			this.randomCol[place - 1] = result.selectTeam;
		  }
		  if (this.selectedSize == "3x3"){
			if (this.nbSelectedTeams == 6){
				this.chooseMode = false;
				this.blockedGame = false;
			  }
		  }
		  else if(this.selectedSize == "4x4"){
			if (this.nbSelectedTeams == 8){
				this.chooseMode = false;
				this.blockedGame = false;
			}
		  }
		  else if (this.selectedSize == "5x5"){
			if (this.nbSelectedTeams == 10){
				this.chooseMode = false;
				this.blockedGame = false;
			}
		  }
		  
		}
	  });
  }


  openDialog(row: number, col: number, allNameData: any): void {
	this.updatePos(row, col);
	const dialogRef = this.dialog.open(PlayerDialogComponent, {
	  data: { row, col, allNameData },
	});
  
	dialogRef.afterClosed().subscribe(result => {
		if (result && result.playerName) {
		  // Emit the playerName to the main component
		  this.guess = result.playerName;
		  if (this.guess.length !== 0){
			if (this.findPlayers()){
				this.isInTeams(row, col);
			}
			else{
				this.players[row][col] = '';
			}
		  }
		}
	  });
	}

}
