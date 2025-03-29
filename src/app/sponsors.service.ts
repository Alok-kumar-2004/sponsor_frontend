// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// import { Observable } from 'rxjs';
// import {  Sponsors } from './sponsors';


// @Injectable({
//   providedIn: 'root'
// })
// export class SponsorService {


 
//   private baseURL = "http://localhost:8080/api/v1/sponsors";

//   constructor(private httpClient: HttpClient) { }
  
//   getSponsorsList(): Observable<Sponsors[]>{
//     return this.httpClient.get<Sponsors[]>(`${this.baseURL}`);
//   }

//   addSponsors(sponsors: Sponsors): Observable<Object>{
//     return this.httpClient.post(`${this.baseURL}`, sponsors);
//   }

//   getSponsorsById(id: number): Observable<Sponsors>{
//     return this.httpClient.get<Sponsors>(`${this.baseURL}/${id}`);
//   }


//   updateSponsors(id: number, Sponsors: Sponsors): Observable<Object>{
//     return this.httpClient.put(`${this.baseURL}/${id}`, Sponsors);
//   }

//   deleteSponsors(id: number): Observable<Object>{
//     return this.httpClient.delete(`${this.baseURL}/${id}`);
//   }

//   uploadImage(id: number, file: File): Observable<string> {
//     const formData: FormData = new FormData();
//     formData.append('file', file);
//     return this.httpClient.post<string>(`${this.baseURL}/${id}/uploadImage`, formData);
//   }

//   getImageById(oid: string): Observable<string> {
//     return this.httpClient.get(`${this.baseURL}/image/${oid}`, { responseType: 'text' });
//   }

//   deleteImage(id: number): Observable<string> {
//     return this.httpClient.delete(`${this.baseURL}/${id}/deleteImage`, { responseType: 'text' });
//   }
//   fetchImagesForSponsors(sponsors: Sponsors[]): void {
//     sponsors.forEach(sponsor => {
//       if (sponsors.image && !isNaN(Number(sponsor.image)) && !sponsor.image.startsWith('data:')) {
//         this.getImageById(sponsors.image).subscribe(
//           imageData => {
//             sponsor.image = imageData;
//           },
//           error => {
//             console.error(`Failed to load image for sponsor ${sponsor.id}:`, error);
//             sponsors.image = null; // Clear invalid image reference
//           }
//         );
//       }
//     });
//   }

// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable, map } from 'rxjs';
import { Sponsors } from './sponsors';

@Injectable({
  providedIn: 'root'
})
export class SponsorService {
  private baseURL = "http://localhost:8080/api/v1/sponsors";

  constructor(private httpClient: HttpClient) { }
  
  getSponsorsList(): Observable<Sponsors[]> {
    return this.httpClient.get<Sponsors[]>(`${this.baseURL}`).pipe(
      map(sponsors => sponsors.map(sponsor => {
        console.log(sponsors);
        return this.normalizeFields(sponsor);
      }))
    );
  }

  addSponsors(sponsors: Sponsors): Observable<Object> {
    const normalizedSponsors = this.denormalizeFields({...sponsors});
    return this.httpClient.post(`${this.baseURL}`, normalizedSponsors);
  }

  getSponsorsById(id: number): Observable<Sponsors> {
    return this.httpClient.get<Sponsors>(`${this.baseURL}/${id}`).pipe(
      map(sponsor => this.normalizeFields(sponsor))
    );
  }

  updateSponsors(id: number, sponsors: Sponsors): Observable<Object> {
    const normalizedSponsors = this.denormalizeFields({...sponsors});
    return this.httpClient.put(`${this.baseURL}/${id}`, normalizedSponsors);
  }

  deleteSponsors(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  uploadImage(id: number, file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<string>(`${this.baseURL}/${id}/uploadImage`, formData);
  }

  getImageById(oid: string): Observable<string> {
    return this.httpClient.get(`${this.baseURL}/image/${oid}`, { responseType: 'text' });
  }

  deleteImage(id: number): Observable<string> {
    return this.httpClient.delete(`${this.baseURL}/${id}/deleteImage`, { responseType: 'text' });
  }

  private normalizeFields(sponsor: any): Sponsors {
    const result = {...sponsor};
    
    if (result.sponsorship_status !== undefined) {
      result.SponsorshipStatus = result.sponsorship_status;
    }
   
    if (result.image && !isNaN(Number(result.image))) {
      result.imageOid = result.image;
     
    }
    
    return result as Sponsors;
  }

  private denormalizeFields(sponsor: any): any {
    const result = {...sponsor};
    
    if (result.SponsorshipStatus !== undefined) {
      result.sponsorship_status = result.SponsorshipStatus;
    }
    
    return result;
  }

  fetchImagesForSponsors(sponsors: Sponsors[]): void {
    sponsors.forEach(sponsor => {
      if (sponsor.image && typeof sponsor.image !== 'string') {
        sponsor.image = String(sponsor.image);
      }
      
      if (sponsor.image && !isNaN(Number(sponsor.image)) && 
          (typeof sponsor.image === 'string' && !sponsor.image.startsWith('data:'))) {
        this.getImageById(sponsor.image).subscribe(
          imageData => {
            sponsor.image = imageData.toString();
          },
          error => {
            console.error(`Failed to load image for sponsor ${sponsor.id}:`, error);
            sponsor.image = '';
          }
        );
      }
    });
  }

}

