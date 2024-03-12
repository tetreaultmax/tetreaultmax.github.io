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
	allIds = [];
	randomIndex: number = 0;
	feedbackMessage: string = "";
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
			this.chooseRandomPlayer();
		});
	}
	chooseRandomPlayer() {
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
		// redirect to landing page
		this.router.navigate(['/']);
	}
	getPlayerImageUrl(): string {
		// Implement based on how you manage player images
		const url = "https://assets.nhle.com/mugs/nhl/20232024/" + this.dataHand[this.randomIndex].team + "/"+
		this.dataHand[this.randomIndex].player_id  + ".png";
		console.log(url);
		return url;
	}
	guess(hand: string) {
		if (this.currentAnswer === hand) {
		  this.feedbackMessage = "Correct! Nice job.";
		  setTimeout(() => {
			this.feedbackMessage = ""; // Optionally clear the message
			this.chooseRandomPlayer();
		  }, 2000); // Wait for 2 seconds before showing the next player
		} else {
		  this.feedbackMessage = "Oops! That's not correct.";
		  setTimeout(() => {
			this.feedbackMessage = ""; // Optionally clear the message
			this.chooseRandomPlayer();
		  }, 2000); // Wait for 2 seconds before showing the next player
		}
	}
}
