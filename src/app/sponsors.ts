// import { DatePipe } from '@angular/common';

export class Sponsors {
  id!: number;
  sponsorName!: string;
  contactPerson!: string;
  email!: string;
  SponsorshipStatus!: string;
  contributionAmount!: number;
  startDate!: string;
  endDate!: string;
  image!:String;
  
    
   
  constructor() { 
      this.email = "@gmail.com";
      this.contributionAmount = 0;
      this.SponsorshipStatus = "active";
      this.startDate = "";
      this.endDate = "";
      this.image=""
}}
