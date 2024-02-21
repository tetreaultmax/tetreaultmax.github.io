import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-TeamDetail',
  templateUrl: './TeamDetail.component.html',
  styleUrls: ['./TeamDetail.component.css']
})
export class TeamDetailComponent implements OnInit {
	teamId: string = "";
  
	constructor(private route: ActivatedRoute,private router: Router) { }
	goBack(){
		// redirect to landing page
		this.router.navigate(['/history']);
	}
	goLanding(){
		// redirect to landing page
		this.router.navigate(['/']);
	}
	ngOnInit() {
	  this.teamId = this.route.snapshot.paramMap.get('id')!;
	  // Now you can use this.teamId to fetch or display the team's details
	}
}
