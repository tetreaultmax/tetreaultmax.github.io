import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

export interface Player {
	position: number;
	name: string;
	pos: string;
	gp: number;
	g: number;
	a: number;
	p: number;
}

let ELEMENT_DATA: Player[] = [];

@Component({
  selector: 'app-TeamDetail',
  templateUrl: './TeamDetail.component.html',
  styleUrls: ['./TeamDetail.component.css'],
})

export class TeamDetailComponent implements OnInit {
	teamId: string = "";
	displayedColumns: string[] = ['position', 'name', 'pos', 'gp', 'g', 'a', 'p'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);
	constructor(private route: ActivatedRoute,private router: Router) { }
	roster: any;

	goBack(){
		this.router.navigate(['/history']);
	}
	goLanding(){
		this.router.navigate(['/']);
	}

	updateRank(){
		for (let i = 0; i < ELEMENT_DATA.length; i++){
			ELEMENT_DATA[i].position = i + 1;
		}
	}

	
	ngOnInit() {
		// clear the table
		ELEMENT_DATA = [];
	  this.teamId = this.route.snapshot.paramMap.get('id')!; 
	  // open json file in assets
	  fetch('../../assets/nhl_stats.json').then(response => {
		return response.json();
	  }
	  ).then(data => {
		this.roster = data.filter((player: any) => player.Team == this.teamId);
		let i = 1
		this.roster.forEach((player: any) => {
			ELEMENT_DATA.push({position: i, name: player.Player_Name, pos: player.Position, gp: player.Games_Played, g: player.Goals, a: player.Assists, p: player.Points});
			i++;
		});
		ELEMENT_DATA.sort((a, b) => (a.p > b.p) ? -1 : 1);
		this.updateRank();
		this.dataSource = new MatTableDataSource(ELEMENT_DATA);
		}
	  );
	}
}
