import { Component } from '@angular/core';

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
  findGuess: any;
  cellBackgrounds: string[][] = [];
  nbGuess = 0;
  toggleValue = false;
  start = false;
  timer: number = 120;
  test = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  filteredPlayers = [];
  currentRow = -1;
  currentCol = -1;
  closeHelp = false;

  constructor() {
    this.updateGridSize();
	// read a json file
	fetch('../assets/nhl_players.json')
  		.then(response => response.json())
  		.then(jsonData => {
    	// Access the data stored in the variable
		this.jsonData = jsonData;	
  	})
  	.catch(error => {
    	console.error('Error fetching JSON file:', error);
  	});
  }



  updateGridSize() {
    const [rows, cols] = this.selectedSize.split('x').map(Number);
    this.grid = Array(rows).fill(0).map((_, index) => index + 1);
    this.initGrid(cols);
	this.randomTeams();
	// Initialize the cellBackgrounds array with empty strings for all cells
	for (let row = 0; row < rows; row++) {
		this.cellBackgrounds[row] = [];
		for (let col = 0; col < cols; col++) {
			this.cellBackgrounds[row][col] = '';
		}
	}
	this.nbGuess = rows * cols + 1;
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

	const isConditionMet = arrayTeam.includes(this.dictNhlAbrv[team1]) && arrayTeam.includes(this.dictNhlAbrv[team2]);

	if (isConditionMet) {
		this.cellBackgrounds[row - 1][col - 1] = 'green'; // Set the background color to green for the current cell
	} else {
		this.cellBackgrounds[row - 1][col - 1] = ''; // Clear the background color for the current cell
		this.players[row][col] = '';
	}
  }

  findPlayers(): boolean{
	for (let i = 0; i < this.jsonData.length; i++) {
		let player = this.jsonData[i];
		if (player["Player Name"] == this.guess){
			this.findGuess = player;
			this.timer = 120;
			return true;
		}
	}
	return false;
  }

  isGreen(row: number, col: number): boolean {
	return this.cellBackgrounds[row][col] === 'green';
  }

  reset() {
	this.updateGridSize();
  }

  onToggleChange(event: any) {
    this.toggleValue = event.checked;
    // Handle toggle value change
  }

  startGame(){
	this.startTimer();
	this.start = true;
  }

  startTimer() {
    setInterval(() => {
      this.timer--;
    }, 1000); // Increment the timer value every second (1000 milliseconds)
  }

  handleInput(target: any, row: number, col: number) {
    if (target.value !== null) {
	  this.guess = target.value;
	  if (this.guess.length !== 0){
		this.nbGuess -= 1;
		if (this.findPlayers()){
			this.isInTeams(row, col);
		}
		else{
			this.players[row][col] = '';
		}
		if (this.nbGuess == 0){
			alert("Game Over");
		}
	  }
    }
  }

  updatePos(row: number, col: number){
	this.currentRow = row;
	this.currentCol = col;
  }

  help(){
	const currentGuess = this.players[this.currentRow][this.currentCol];
	// Get all the players in jsonData that the layer name include the current guess
	const allPlayers = this.jsonData.filter((player: { [x: string]: string; }) => player["Player Name"].toLowerCase().includes(currentGuess.toLowerCase()));
	// Extract the player name and the season
	this.filteredPlayers = allPlayers.map((player: { [x: string]: string; }) => player["Player Name"] + " - " + player["Last Season"]);
	this.closeHelp = true;
  }
  close(){
	this.closeHelp = false;
  }

  handleItemClick(item: string){
	this.players[this.currentRow][this.currentCol] = item.split(" - ")[0];
	this.closeHelp = false;
	this.nbGuess -= 1;
	this.guess = item.split(" - ")[0];
	if (this.findPlayers()){
		this.isInTeams(this.currentRow, this.currentCol);
	}
	else{
		this.players[this.currentRow][this.currentCol] = '';
	}
  }

}
