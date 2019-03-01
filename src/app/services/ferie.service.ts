import {Injectable} from '@angular/core';
import {Ferie} from '../model/ferie';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {API_BAS_URL, API_FERIE} from './constServices';


@Injectable()
export class FerieService {

  constructor(private http: HttpClient) {
  }

  getYears() {
    return this.http.get<number[]>(`${API_BAS_URL}${API_FERIE}/annees`);
  }

  getFeriesByYear(annee: number): Observable<Ferie[]> {
    return this.http.get<Ferie[]>(`${API_BAS_URL}${API_FERIE}?annee=${annee}`);
  }

  getFeries(): Observable<Ferie[]> {
    return this.http.get<Ferie[]>(`${API_BAS_URL}${API_FERIE}`);
  }

  deleteFerieId(id: number) {
    return this.http.delete(`${API_BAS_URL}${API_FERIE}/${id}`);
  }

  deleteAllFerie() {
    return this.http.delete(`${API_BAS_URL}${API_FERIE}/`);
  }

  addFerie(ferie: Ferie) {
    return this.http.post<Ferie>(`${API_BAS_URL}${API_FERIE}/`, ferie);
  }

  modifFerie(ferie: Ferie) {
    return this.http.put<Ferie>(`${API_BAS_URL}${API_FERIE}/${ferie.id}`, ferie);
  }

}
