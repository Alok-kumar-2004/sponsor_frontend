import { Component } from '@angular/core';
import { Sponsors } from '../sponsors';
import { SponsorService } from '../sponsors.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent {

  id: number
  sponsors!: Sponsors
  constructor(private route: ActivatedRoute, private SponsorService: SponsorService) { 

    this.id=0
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.sponsors = new Sponsors();
    this.SponsorService.getSponsorsById(this.id).subscribe( data => {
      this.sponsors = data;
    });
  }

}
