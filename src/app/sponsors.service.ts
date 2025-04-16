import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import {  Sponsors } from './sponsors';


@Injectable({
  providedIn: 'root'
})
export class SponsorService {


 
  private baseURL = "sponsor_backend.railway.internal";

  constructor(private httpClient: HttpClient) { }
  
  getSponsorsList(): Observable<Sponsors[]>{
    return this.httpClient.get<Sponsors[]>(`${this.baseURL}`);
  }

  addSponsors(sponsors: Sponsors): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`, sponsors);
  }

  getSponsorsById(id: number): Observable<Sponsors>{
    return this.httpClient.get<Sponsors>(`${this.baseURL}/${id}`);
  }


  updateSponsors(id: number, Sponsors: Sponsors): Observable<Object>{
    return this.httpClient.put(`${this.baseURL}/${id}`, Sponsors);
  }

  deleteSponsors(id: number): Observable<Object>{
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  getSponsorsByEventName(eventName: string): Observable<Sponsors[]> {
    return this.httpClient.get<Sponsors[]>(`${this.baseURL}/name/${eventName}`);
  }
}