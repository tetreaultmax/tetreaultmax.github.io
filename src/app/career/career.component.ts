import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { last } from 'rxjs';
interface NhlAbrvDictionary {
	[key: string]: string;
  }
@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent {
	all_nhl_teams = ["ANA", "ARI", "BOS", "BUF", "CGY", "CAR", "CHI", "COL", "CBJ", "DAL", "DET", "EDM", "FLA", "LAK", "MIN", "MTL", "NSH", "NJD", "NYI", "NYR", "OTT", "PHI", "PIT", "SJS", "SEA", "STL", "TBL", "TOR", "VAN", "VGK", "WSH", "WPG"];
	nhl_dict: NhlAbrvDictionary = {
		"Anaheim Ducks": "ANA",
		"Arizona Coyotes": "ARI",
		"Boston Bruins": "BOS",
		"Buffalo Sabres": "BUF",
		"Calgary Flames": "CGY",
		"Carolina Hurricanes": "CAR",
		"Chicago Blackhawks": "CHI",
		"Colorado Avalanche": "COL",
		"Columbus Blue Jackets": "CBJ",
		"Dallas Stars": "DAL",
		"Detroit Red Wings": "DET",
		"Edmonton Oilers": "EDM",
		"Florida Panthers": "FLA",
		"Los Angeles Kings": "LAK",
		"Minnesota Wild": "MIN",
		"Montréal Canadiens": "MTL",
		"Nashville Predators": "NSH",
		"New Jersey Devils": "NJD",
		"New York Islanders": "NYI",
		"New York Rangers": "NYR",
		"Ottawa Senators": "OTT",
		"Philadelphia Flyers": "PHI",
		"Pittsburgh Penguins": "PIT",
		"San Jose Sharks": "SJS",
		"Seattle Kraken": "SEA",
		"St. Louis Blues": "STL",
		"Tampa Bay Lightning": "TBL",
		"Toronto Maple Leafs": "TOR",
		"Vancouver Canucks": "VAN",
		"Vegas Golden Knights": "VGK",
		"Washington Capitals": "WSH",
		"Winnipeg Jets": "WPG"
	}
	jsonData: any;
	url = "";
	playerName: string = "";
	playerId: string = "";
	playerTeams: string[] = [];
	playerLogo: string[] = [];
	answer = false;
	constructor(private router: Router){
		fetch('../assets/nhl_players_career.json')
			.then(response => response.json())
			.then(jsonData => {
			// Access the data stored in the variable
			this.jsonData = jsonData;
			this.chooseRandomPlayer();
  		});
	}
	chooseRandomPlayer(){
		let player = this.jsonData[Math.floor(Math.random() * this.jsonData.length)];
		while (player["Teams"].length < 3) {
			player = this.jsonData[Math.floor(Math.random() * this.jsonData.length)];
		}
		// Get last team
		const lastTeam = player["Teams"][player["Teams"].length - 1];
		this.url = "https://assets.nhle.com/mugs/nhl/20232024/" + this.nhl_dict[lastTeam] + "/"+ player["Player ID"]  + ".png";
		this.playerName = player["Player Name"];
		this.playerId = player["Player ID"];
		this.playerTeams = player["Teams"];
		this.playerLogo = [];
		for (let i = 0; i < this.playerTeams.length; i++) {
			this.playerLogo.push("assets/"+this.nhl_dict[this.playerTeams[i]] +".png");
			console.log(this.playerLogo[i]);
		}
		this.answer = false;
	}
	goLanding(){
		// redirect to landing page
		this.router.navigate(['/']);
	}
	showAnswer(){
		this.answer = !this.answer;
	}
}
