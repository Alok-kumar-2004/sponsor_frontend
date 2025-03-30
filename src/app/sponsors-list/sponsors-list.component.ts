// import { Component, OnInit } from '@angular/core';
// import { Sponsors } from '../sponsors';
// import { SponsorService } from '../sponsors.service';
// import{FormsModule} from '@angular/forms'

// import { Router } from '@angular/router';
// import { tap } from 'rxjs';
// @Component({
//   selector: 'app-sponsors-list',
//   templateUrl: './sponsors-list.component.html',
//   styleUrls: ['./sponsors-list.component.css']
// })
// export class SponsorsListComponent implements OnInit {

//   sponsors: Sponsors[] = [];
//   EnteredID!:number;

//   constructor(private SponsorService: SponsorService,  private router: Router) {
//     this.sponsors=[];
   
//    }
//   ngOnInit(): void {
    
//     this.getSponsorss();
//   }

//   goToSponsors(){
//     console.log(this.EnteredID); 
//     this.router.navigate(['details-of-sponsors',this.EnteredID]);
//   }

//   getSponsorss(){
//     this.SponsorService.getSponsorsList().subscribe(
//       (data: Sponsors[]) => {
//         console.log("Sponsors retrieved:", data);
//         this.sponsors = data;
//       },
//       error => {
//         console.error("Error retrieving sponsors:", error);
//       }
//     );
//   }

//   updateSponsors(id: number){
//     this.router.navigate(['updating-by-id', id]);
//   }

//   deleteSponsors(id: number){
//     if (confirm("Are you sure you want to delete Sponsor ID: " + id + "?")) {
//       this.SponsorService.deleteSponsors(id).pipe(
//         tap(() => {
//           console.log(`Deleted sponsor with ID: ${id}`);
//           this.getSponsorss();
//         })
//       ).subscribe();
//     }
//   }
//   detailsOfSponsors(id: number){
//     this.router.navigate(['details-of-sponsors', id]);
//   }

  
// }

import { Component, OnInit } from '@angular/core';
import { Sponsors } from '../sponsors';
import { SponsorService } from '../sponsors.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-sponsors-list',
  templateUrl: './sponsors-list.component.html',
  styleUrls: ['./sponsors-list.component.css']
})
export class SponsorsListComponent implements OnInit {

  sponsors: Sponsors[] = [];
  sponsorsByEvent: { [key: string]: Sponsors[] } = {};
  eventNames: string[] = [];
  EnteredID!: number;

  constructor(private SponsorService: SponsorService, private router: Router) {
    this.sponsors = [];
  }
  
  ngOnInit(): void {
    this.getSponsorss();
  }

  goToSponsors() {
    console.log(this.EnteredID); 
    this.router.navigate(['details-of-sponsors', this.EnteredID]);
  }

  getSponsorss() {
    this.SponsorService.getSponsorsList().subscribe(
      (data: Sponsors[]) => {
        console.log("Sponsors retrieved:", data);
        this.sponsors = data;
        this.groupSponsorsByEvent();
      },
      error => {
        console.error("Error retrieving sponsors:", error);
      }
    );
  }

  groupSponsorsByEvent() {
    // Reset groupings
    this.sponsorsByEvent = {};
    this.eventNames = [];
    
    // Group sponsors by event name
    this.sponsors.forEach(sponsor => {
      const eventName = sponsor.eventName || 'Uncategorized';
      
      if (!this.sponsorsByEvent[eventName]) {
        this.sponsorsByEvent[eventName] = [];
        this.eventNames.push(eventName);
      }
      
      this.sponsorsByEvent[eventName].push(sponsor);
    });
    
    // Sort event names alphabetically
    this.eventNames.sort();
  }

  updateSponsors(id: number){
    this.router.navigate(['updating-by-id', id]);
  }

  deleteSponsors(id: number){
    if (confirm("Are you sure you want to delete Sponsor ID: " + id + "?")) {
      this.SponsorService.deleteSponsors(id).pipe(
        tap(() => {
          console.log(`Deleted sponsor with ID: ${id}`);
          this.getSponsorss();
        })
      ).subscribe();
    }
  }
  
  detailsOfSponsors(id: number){
    this.router.navigate(['details-of-sponsors', id]);
  }
}