import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ClueComponent } from '../clue/clue.component';
import { DivisionComponent } from '../division/division.component';
import { Router } from '@angular/router';

export interface Guess {
	firstName: string;
	lastName: string;
	team: string;
	division: string;
	position: string;
	age: string;
	number: string;
	url_image : string;
}
export interface GuessUser {
	num: number;
	firstName: string;
	lastName: string;
	team: string;
	division: string;
	position: string;
	age: string;
	number: string;
	
}

const ATLANTIC = new Set<string>(['FLA', 'TBL', 'TOR', 'BOS', 'DET', 'BUF', 'OTT', 'MTL']);
const METROPOLITAN = new Set<string>(['CAR', 'PIT', 'NYR', 'NYI', 'WSH', 'CBJ', 'NJD', 'PHI']);
const CENTRAL = new Set<string>(['COL', 'STL', 'MIN', 'NSH', 'DAL', 'WIN', 'CHI', 'ARI']);
const PACIFIC = new Set<string>(['CGY', 'LAK', 'EDM', 'VGK', 'VAN', 'ANA', 'SJS', 'SEA']);
@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})
export class WordleComponent {
	title = 'GuessNHL';
	numGuess = 1;
	guesses: GuessUser[] = [];
	tryGuess: Guess;
	currentGuess: GuessUser;
	allData: string;
	allInfo: string[][];
	showImage: boolean = false;
	allNames : string[];
	constructor(private http: HttpClient, public dialog: MatDialog, private router: Router){
	  this.tryGuess = {
		  firstName: "",
		  lastName: "",
		  team: "",
		  division: "",
		  position: "",
		  age: "",
		  number: '',
		  url_image : "http://nhl.bamcontent.com/images/headshots/current/168x168/"
	  };
	  this.currentGuess = {
		  num: 0,
		  firstName: "",
		  lastName: "",
		  team: "",
		  division: "",
		  position: "",
		  age: "",
		  number: ''
	  };
	  this.allNames = [];
	  this.allData = "";
	  this.allInfo = [[]];
	  this.http.get('assets/players.csv', {responseType: 'text'})
	  .subscribe(
		  data => {
			  this.allData = data;
			  this.randomPlayerInfo(data);
			  let csvToRowArray = data.split("\n");
			  for (let row of csvToRowArray){
				  this.allNames.push(row.split(",")[0] + " " + row.split(",")[1]);
				  this.allInfo.push(row.split(","));
			  }
			  this.allNames.shift();
		  },
		  error => {
			  console.log(error);
		  }
	  );
  
	}
	checkAnswer(){
		if (this.currentGuess.firstName == this.tryGuess.firstName && this.currentGuess.lastName == this.tryGuess.lastName){
			this.showImage = true;
			alert("You got it right! The player is " + this.tryGuess.firstName + " " + this.tryGuess.lastName + "!");
		}
	  }
  
	  clearGuess(){
		  this.currentGuess = {
			  num: 0,
			  firstName: "",
			  lastName: "",
			  team: "",
			  division: "",
			  position: "",
			  age: "",
			  number: ''
		  };
	  }
	
	  updateTable() {
		const playerGuess = (<HTMLInputElement>document.getElementById('playerGuess')).value;
		this.clearGuess();
		for(let info of this.allInfo){
			if (info[1] == playerGuess.split(' ')[1] && info[0] == playerGuess.split(' ')[0]){
				this.currentGuess.num = this.numGuess++;
				this.currentGuess.firstName = playerGuess.split(' ')[0];
				this.currentGuess.lastName = playerGuess.split(' ')[1];
				this.currentGuess.age = info[5];
				this.currentGuess.number = info[4];
				this.currentGuess.position = info[2];
				this.currentGuess.team = info[3];
				this.currentGuess.division = this.checkDiv(info[3]);
				break;
			}
		};
		if (this.currentGuess.firstName == ""){
			alert("Please enter a valid player name");
		}
		else {
		  const newGuess = Object.assign({}, this.currentGuess);
		  this.guesses.unshift(newGuess);
		  this.checkAnswer();
		}
	
	  }
	  restartGame(){
		this.guesses = [];
		this.numGuess = 1;
		this.showImage = false;
		this.tryGuess.url_image = "http://nhl.bamcontent.com/images/headshots/current/168x168/";
		this.randomPlayerInfo(this.allData);
	  }
	
	  clearInput(input: any) {
		input.value = '';
	  }
	
	  checkDiv(team: string){
		if(ATLANTIC.has(team)){
			return "ATL";
		}
		else if (METROPOLITAN.has(team)){
			return "MET";
		}
		else if (PACIFIC.has(team)){
			return "PAC";
		}
		return "CEN";
		
		}
	
	
	  randomPlayerInfo(data: string){
		let csvToRowArray = data.split("\n");
		let index = Math. floor(Math. random() * (csvToRowArray.length + 1));
		let row = csvToRowArray[index].split(",");
		this.tryGuess.firstName = row[0];
		this.tryGuess.lastName = row[1];
		this.tryGuess.position = row[2];
		this.tryGuess.team = row[3];
		this.tryGuess.number = row[4];
		this.tryGuess.age = row[5];
		this.tryGuess.division = this.checkDiv(row[3]);
		this.tryGuess.url_image = this.tryGuess.url_image + row[6] + ".jpg"
		console.log(this.tryGuess);
		}
	
		chooseColorPos(position: string){
			const rightPosition = this.tryGuess.position;
			if (position == rightPosition){
				return "#90EE90";
			}
			else if((position == "RW" || position == "LW" || position == "C") && (rightPosition == "RW" || rightPosition == "LW" || rightPosition == "C")){
				return "#FFF633";
			}
			else if((position == "D") && (rightPosition == "RW" || rightPosition == "LW" || rightPosition == "C" || rightPosition == "G")){
				return "#F70404";
			}
			else if((position == "G") && (rightPosition == "RW" || rightPosition == "LW" || rightPosition == "C" || rightPosition == "D")){
				return "#F70404";
			}
			return "";
		}
	
		chooseColorAge(age: string){
			const rightAge = this.tryGuess.age;
			if (age == rightAge){
				return "#90EE90";
			}
			else if (Math.abs(parseInt(age) - parseInt(rightAge)) >= 10){
				return "#F70404";
			}
			else if (Math.abs(parseInt(age) - parseInt(rightAge)) > 5){
				return "#FF6D6D";
			}
			else if (Math.abs(parseInt(age) - parseInt(rightAge)) <= 5){
				return "#FFF633";
			}
			return "";
		}
	
		chooseColorNumber(number: string){
			const rightNumber = this.tryGuess.number;
			if (number == rightNumber){
				return "#90EE90";
			}
			else if (Math.abs(parseInt(number) - parseInt(rightNumber)) >= 30){
				return "#F70404";
			}
			else if (Math.abs(parseInt(number) - parseInt(rightNumber)) > 10){
				return "#FF6D6D";
			}
			else if (Math.abs(parseInt(number) - parseInt(rightNumber)) <= 10){
				return "#FFF633";
			}
			return "";
		}
	
		chooseColorTeam(team: string){
			if (team == this.tryGuess.team){
				return "#90EE90";
			}
			return "";
		}
	
		chooseColorDivision(division: string){
			const rightDivision = this.tryGuess.division;
			if (division == rightDivision){
				return "#90EE90";
			}
			else if((division == "ATL" || division == "MET") && (rightDivision == "ATL" || rightDivision == "MET")){
				return "#FFF633";
			}
			else if((division == "CEN" || division == "PAC") && (rightDivision == "CEN" || rightDivision == "PAC")){
				return "#FFF633";
			}
			else if((division == "ATL" || division == "MET") && (rightDivision == "CEN" || rightDivision == "PAC")){
				return "#F70404";
			}
			else if((division == "CEN" || division == "PAC") && (rightDivision == "ATL" || rightDivision == "MET")){
				return "#F70404";
			}
			return "";
		}
	
		chooseColorFirstName(firstName: string){
			if (firstName == this.tryGuess.firstName){
				return "#90EE90";
			}
			return "";
		}
		chooseColorLastName(lastName: string){
			if (lastName == this.tryGuess.lastName){
				return "#90EE90";
			}
			return "";
		}
		openDialogHelp(): void {
		  const dialogRef = this.dialog.open(HelpDialogComponent, {
			width: '400px', // You can customize the width
			disableClose: false, // Prevents closing the dialog by clicking outside or pressing ESC
		  });
		}
		openDialogClue(): void {
		  const dialogRef = this.dialog.open(ClueComponent, {
			data : {name: this.tryGuess.firstName + " " + this.tryGuess.lastName},
			width: '400px', // You can customize the width
			disableClose: false, // Prevents closing the dialog by clicking outside or pressing ESC
		  });
		}
  
		openDivision(){
		  const dialogRef = this.dialog.open(DivisionComponent, {
			width: '800px', // You can customize the width
			disableClose: false, // Prevents closing the dialog by clicking outside or pressing ESC
		  });
		}

		goLanding(){
			// redirect to landing page
			this.router.navigate(['/']);
		}
}
