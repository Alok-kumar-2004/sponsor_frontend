export class Sponsors {
  id!: number;
  sponsorName!: string;
  contactPerson!: string;
  email!: string;
  sponsorshipStatus!: string;
  contributionAmount!: number;
  contactNumber!: number;
  contributionDate!: string;
  organizationName!: string;
  eventName!: string;

  constructor() {
    this.email = '@gmail.com';
    this.contributionAmount = 0;
    this.sponsorshipStatus = 'active';
    this.contributionDate = '';
    this.sponsorName = '';
    this.contactPerson = '';
    this.contactNumber = 987654321;
    this.organizationName = '';
    this.eventName = '';
  }
}
