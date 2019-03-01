import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Rtt} from '../model/rtt';
import {API_BASE_URL, API_FERIE, API_RTT} from './constServices';



@Injectable()
export class RttService {

  constructor(private http: HttpClient) {
  }

  getYears() {
    return this.http.get<number[]>(`${API_BASE_URL}${API_RTT}/annees`);
  }

  getRttsByYear(annee: number): Observable<Rtt[]> {
    return this.http.get<Rtt[]>(`${API_BASE_URL}${API_RTT}?annee=${annee}`);
  }

  getRtts(): Observable<Rtt[]> {
    return this.http.get<Rtt[]>(`${API_BASE_URL}${API_RTT}`);
  }

  deleteRttId(id: number) {
    return this.http.delete(`${API_BASE_URL}${API_RTT}/${id}`);
  }

  deleteAllRtt() {
    return this.http.delete(`${API_BASE_URL}${API_RTT}/`);
  }

  addRtt(rtt: Rtt) {
    return this.http.post<Rtt>(`${API_BASE_URL}${API_RTT}/`, rtt);
  }

  modifRtt(rtt: Rtt) {
    return this.http.put<Rtt>(`${API_BASE_URL}${API_RTT}/${rtt.id}`, rtt);
  }

}
