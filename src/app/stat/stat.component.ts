import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent {
	imagePaths: string[] = [
		"../../assets/nhl.png",
		"../../assets/ANA.png",
		"../../assets/ARI.png",
		"../../assets/BOS.png",
		"../../assets/BUF.png",
		"../../assets/CAR.png",
		"../../assets/CBJ.png",
		"../../assets/CGY.png",
		"../../assets/CHI.png",
		"../../assets/COL.png",
		"../../assets/DAL.png",
		"../../assets/DET.png",
		"../../assets/EDM.png",
		"../../assets/FLA.png",
		"../../assets/LAK.png",
		"../../assets/MIN.png",
		"../../assets/MTL.png",
		"../../assets/NJD.png",
		"../../assets/NSH.png",
		"../../assets/NYI.png",
		"../../assets/NYR.png",
		"../../assets/OTT.png",
		"../../assets/PHI.png",
		"../../assets/PIT.png",
		"../../assets/SEA.png",
		"../../assets/SJS.png",
		"../../assets/STL.png",
		"../../assets/TBL.png",
		"../../assets/TOR.png",
		"../../assets/VAN.png",
		"../../assets/VGK.png",
		"../../assets/WSH.png",
		"../../assets/WPG.png",
		
	  ];

	dataPlayers: any[] = [];
	displayedColumns: string[] = ['name', 'position', 'team', 'games', 'goals', 'assists', 'points', 'plusMinus', 'penaltyMinutes'];
	dataSource: MatTableDataSource<any>;
	baseUrl = "https://statsapi.web.nhl.com/api/v1/people/";
	constructor(private router: Router, private http: HttpClient) { 
		this.http.get('assets/players.csv', {responseType: 'text'})
	  .subscribe(
		  data => {
			  let csvToRowArray = data.split("\n");
			  for (let row of csvToRowArray){
				//skip first row and last row
				if(row.split(",")[0] == "firstName"){
					continue;
				}
				if(row.split(",")[0] == ""){
					break;
				}
			this.http.get(this.baseUrl + row.split(",")[6]?.replace(/\r/g, '') + "/stats?stats=statsSingleSeason&season=20232024", {responseType: 'json'})
			.subscribe(
				(data:any) => {
					if (row.split(",")[2] != "G" && data.stats[0].splits[0]?.stat.games > 0){
						const player = {
							name: row.split(",")[0] + " " + row.split(",")[1],
							position: row.split(",")[2],
							team: row.split(",")[3],
							games: data.stats[0].splits[0]?.stat.games,
							goals: data.stats[0].splits[0]?.stat.goals,
							assists: data.stats[0].splits[0]?.stat.assists,
							points: data.stats[0].splits[0]?.stat.points,
							plusMinus: data.stats[0].splits[0]?.stat.plusMinus,
							penaltyMinutes: data.stats[0].splits[0]?.stat.penaltyMinutes,
						}
						this.dataPlayers.push(player);
						this.updateDataSource();
					}
				},
				error => {
					console.log(error);
				}
			);
			  }
		  
		  },
		  error => {
			  console.log(error);
		  }
	  );
	  this.dataSource = new MatTableDataSource(this.dataPlayers);
	}

	updateDataSource() {
		this.dataSource = new MatTableDataSource(this.dataPlayers); // Initialize the data source
		this.dataSource.paginator = this.paginator; // Set the paginator
		this.dataSource.sort = this.sort;
		this.sort.active = 'points'; // Default sort by 'points'
		this.sort.direction = 'desc'; // Default sorting direction is descending
	}

	updateDataSourceTeam(imagePath: string) {
		// Get the team from the image path
		let team = imagePath.split("/")[3].split(".")[0];
		if (team == "nhl") {
			this.dataSource = new MatTableDataSource(this.dataPlayers);
			
		}
		else{
			// Filter the data by the team
			const playerTeam = this.dataPlayers.filter(player => player.team == team);
			this.dataSource = new MatTableDataSource(playerTeam); // Initialize the data source
		}
		this.dataSource.paginator = this.paginator; // Set the paginator
		this.dataSource.sort = this.sort;
		this.sort.active = 'points'; // Default sort by 'points'
		this.sort.direction = 'desc'; // Default sorting direction is descending
	}

	goLanding(){
		// redirect to landing page
		this.router.navigate(['/']);
	}

	paginator!: MatPaginator;
	sort!: MatSort;

	@ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
		this.paginator = paginator;
		this.dataSource.paginator = this.paginator;
	}

	@ViewChild(MatSort) set matSort(sort: MatSort) {
		this.sort = sort;
		this.dataSource.sort = this.sort;
	}
}
