import { Component } from '@angular/core';
import { Sponsors } from '../sponsors';
import { Observable } from 'rxjs';
import { SponsorService } from '../sponsors.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';





@Component({
  selector: 'app-add-sponsors',
  templateUrl: './add-sponsors.component.html'
  ,
  styleUrls: ['./add-sponsors.component.css']
})
export class AddSponsorsComponent 
{

  constructor(
    private SponsorService: SponsorService,
    private router: Router,

  ) {

  } 
 
  submitform!: NgForm;
  private baseURL = "http://localhost:8080/api/v1/sponsors";
  sponsors: Sponsors = new Sponsors();

  

  saveSponsor() {
    this.SponsorService.addSponsors(this.sponsors).subscribe(data => {
      console.log(data);
      this.goToSponsorList();
    },
      error => console.log(error));
  }

  goToSponsorList() {
    this.router.navigate(['/show-all-sponsors']);
  }

  ngOnInit(): void { }
  onSubmit() {
    console.log(this.sponsors);


    this.saveSponsor();
  }
}









