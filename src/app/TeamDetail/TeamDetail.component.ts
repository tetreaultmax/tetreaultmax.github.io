import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';

export interface Player {
	player_id: number;
	position: number;
	name: string;
	pos: string;
	gp: number;
	g: number;
	a: number;
	p: number;
	SAi: number;
}

let ELEMENT_DATA: Player[] = [];

@Component({
  selector: 'app-TeamDetail',
  templateUrl: './TeamDetail.component.html',
  styleUrls: ['./TeamDetail.component.css'],
})

export class TeamDetailComponent implements OnInit, AfterViewInit {
	teamId: string = "";
	displayedColumns: string[] = ['position', 'name', 'pos', 'gp', 'g', 'a', 'p', 'SAi'];
	dataSource = new MatTableDataSource(ELEMENT_DATA);
	@ViewChild(MatSort, {static: true}) sort!: MatSort;

	constructor(private route: ActivatedRoute,private router: Router) { }
	roster: any;
	sai_array: any;
	ngOnInit() {
		this.teamId = this.route.snapshot.paramMap.get('id')!;
		fetch('../../assets/coeff.json').then(response => response.json())
		  .then(data => {
			this.sai_array = data;
		  });

		fetch('../../assets/nhl_stats.json').then(response => response.json())
		  .then(data => {
			this.roster = data.filter((player: any) => player.Team == this.teamId);
			let processedData: Player[] = this.roster.map((player: any, index: number) => ({
			  player_id: player.Player_ID,
			  position: index + 1,
			  name: player.Player_Name,
			  pos: player.Position,
			  gp: player.Games_Played,
			  g: player.Goals,
			  a: player.Assists,
			  p: player.Points,
			  // If the player's ID is in the SAI array, then use the SAI value, otherwise use 0
			  SAi: this.sai_array[player.Player_ID] ? this.sai_array[player.Player_ID][0] : 0
			}));
			
			// Now sort this processed data if necessary before setting it
			processedData.sort((a, b) => (a.p > b.p) ? -1 : 1);
	  
			// Directly update the dataSource's data property
			this.dataSource.data = processedData;
		  });
	  }
	  
	ngAfterViewInit() {
		this.dataSource.sort = this.sort;
	  }

	goBack(){
		this.router.navigate(['/history']);
	}
	goLanding(){
		this.router.navigate(['/']);
	}
}
