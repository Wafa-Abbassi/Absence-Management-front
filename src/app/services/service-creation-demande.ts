import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {DemandeAbsence} from '../model/demande';

const API_BASE_URL: string = 'http://localhost:4200/';

@Injectable()
export class ApiServiceService {

  constructor(private http: HttpClient) {
  }

  sampleHeader() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');

    this.http.get(`${API_BASE_URL}`, {headers});
  }


  postDemande(absence: DemandeAbsence) {
    return this.http.post(`${API_BASE_URL}`, absence);
  }

}
