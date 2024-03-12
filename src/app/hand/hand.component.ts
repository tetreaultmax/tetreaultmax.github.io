import { Component } from '@angular/core';
import { Router } from '@angular/router';
export interface Player {
	player_id: number;
	name: string;
	hand: string;
	team: string;
}
@Component({
  selector: 'app-hand',
  templateUrl: './hand.component.html',
  styleUrls: ['./hand.component.css']
})
export class HandComponent {
	dataHand: any;
	currentAnswer: string = "";
	currentName: string = "";
	randomIndex: number = 0;
	feedbackMessage: string = "";
	currentScore: number = 0;
	totalGuesses: number = 0;
	constructor(private router: Router){
		this.fetchPlayers();
	}
	fetchPlayers() {
		fetch('../../assets/nhl_stats.json').then(response => response.json())
		  .then(data => {
			this.dataHand = data.map((player: any) => ({
			  player_id: player.Player_ID,
			  name: player.Player_Name,
			  hand: player.Hand,
			  team: player.Team
			}));
			this.chooseRandomPlayer(true);
		});
	}
	chooseRandomPlayer(reset: boolean) {
		if (reset) {
		  this.currentScore = 0;
		  this.totalGuesses = 0;
		}
		if (this.dataHand.length > 0) {
		  this.randomIndex = this.getRandomIndex(this.dataHand.length);
		  const player = this.dataHand[this.randomIndex];
		  this.currentName = player.name;
		  this.currentAnswer = player.hand;
		}
	}
	getRandomIndex(length: number): number {
		return Math.floor(Math.random() * length);
	}
	goLanding(){
		this.router.navigate(['/']);
	}
	getPlayerImageUrl(): string {
		const url = "https://assets.nhle.com/mugs/nhl/20232024/" + this.dataHand[this.randomIndex].team + "/"+
			this.dataHand[this.randomIndex].player_id  + ".png";
		return url;
	}
	guess(hand: string) {
		this.totalGuesses++;
		if (this.currentAnswer === hand) {
		  this.currentScore++;
		  this.feedbackMessage = "Correct! Nice job.";
		  setTimeout(() => {
			this.feedbackMessage = "";
			this.chooseRandomPlayer(false);
		  }, 2000);
		} else {
		  this.feedbackMessage = "Oops! That's not correct.";
		  setTimeout(() => {
			this.feedbackMessage = "";
			this.chooseRandomPlayer(false);
		  }, 2000);
		}
	}
}
