import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Absence} from '../model/absence';
import {API_ABSENCES, API_BASEE_URL} from './constServices';

@Injectable()
export class AbsenceService {
  constructor(private http: HttpClient) {
  }

  getAbsences(): Observable<Array<Absence>> {
    return <Observable<Array<Absence>>> this.http.get(`${API_BASEE_URL}${API_ABSENCES}`);
  }

  deleteAbsenceId(absence: Absence) {
    return this.http.delete(`${API_BASEE_URL}${API_ABSENCES}/${absence.id}`);
  }

  GetOneAbsence(absence: Absence): Observable<Absence> {
    return <Observable<Absence>> this.http.post(`${API_BASEE_URL}${API_ABSENCES}`, absence);
  }

  updateAbsence(absence: Absence) {
    return this.http.post(`${API_BASEE_URL}${API_ABSENCES}`, absence);
  }

  putAbsence(absence: Absence): Observable<Absence> {
    return <Observable<Absence>> this.http.put(`${API_BASEE_URL}${API_ABSENCES}` , absence);
  }

}
