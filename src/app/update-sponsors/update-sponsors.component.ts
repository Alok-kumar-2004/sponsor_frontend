import { Component } from '@angular/core';
import { Sponsors } from '../sponsors';
import { Router } from '@angular/router';
import { SponsorService } from '../sponsors.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-update-sponsors',
  templateUrl: './update-sponsors.component.html',
  styleUrls: ['./update-sponsors.component.css']
})
export class UpdateSponsorComponent {
  id: number;
  sponsors: Sponsors = new Sponsors();
  // Sponsors : Sponsors
  
  
  constructor(private SponsorService: SponsorService,
    private route: ActivatedRoute,
    private router: Router) { 
      this.id=0
    }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.SponsorService.getSponsorsById(this.id).subscribe(data => {
      this.sponsors = data;
    }, error => console.log(error));
 
 
  }

  onSubmit(){
    this.SponsorService.updateSponsors(this.id, this.sponsors).subscribe( data =>{
      this.goToSponsorsList();
    }
    , error => console.log(error));
  }

  goToSponsorsList(){
    this.router.navigate(['/show-all-sponsors']);
  }
}
