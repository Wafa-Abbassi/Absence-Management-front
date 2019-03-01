import {Injectable} from '@angular/core';
import Utilisateur from '../model/utilisateur';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as sha from 'sha256';
import {API_BASE_URL, API_UTILISATEUR} from './constServices'; 


@Injectable()
export class UtilisateurService {
  private utilisateur: Utilisateur;

  constructor(private http: HttpClient) {
  }


  initialisationRole(utilisateur: Utilisateur) {
    this.setUtilisateurCourant(utilisateur);
  }
  reinitialisationRole() {
    this.setUtilisateurCourant(null);
  }

  setUtilisateurCourant(utilisateur: Utilisateur) {
    this.utilisateur = utilisateur;
  }


  getUtilisateurCourant() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*','Access-Control-Request-Method': 'GET,POST,DELETE,PUT','Content-Type': 'application/json', 'Access-Control-Allow-Headers' :'Accept,Accept-Language,Content-Language,Content-Type' })
    };
    return this.utilisateur;
  }


  getUtilisateurByEmailAndMdp(utilisateur: Utilisateur) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*','Access-Control-Request-Method': 'GET,POST,DELETE,PUT','Content-Type': 'application/json', 'Access-Control-Allow-Headers' :'Accept,Accept-Language,Content-Language,Content-Type' })
    };
    return this.http.get<Utilisateur>(`${API_BASE_URL}?email=${utilisateur.email}&mdp=${sha(utilisateur.mdp)}`,httpOptions);
  }
  getUtilisateurs(): Observable<Utilisateur[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*','Access-Control-Request-Method': 'GET,POST,DELETE,PUT','Content-Type': 'application/json', 'Access-Control-Allow-Headers' :'Accept,Accept-Language,Content-Language,Content-Type' })
    };
    return this.http.get<Utilisateur[]>(`${API_BASE_URL}${API_UTILISATEUR}`,httpOptions);
  }

  deleteUtilisateurId(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*','Access-Control-Request-Method': 'GET,POST,DELETE,PUT','Content-Type': 'application/json', 'Access-Control-Allow-Headers' :'Accept,Accept-Language,Content-Language,Content-Type' })
    };
    return this.http.delete(`${API_BASE_URL}${API_UTILISATEUR}/${id}`,httpOptions);
  }

  deleteAllUtilisateur() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Access-Control-Allow-Origin': '*','Access-Control-Request-Method': 'GET,POST,DELETE,PUT','Content-Type': 'application/json', 'Access-Control-Allow-Headers' :'Accept,Accept-Language,Content-Language,Content-Type' })
    };
    return this.http.delete(`${API_BASE_URL}${API_UTILISATEUR}/`,httpOptions);
  }

  addUtilisateur(utilisateur: Utilisateur) {
    return this.http.post<Utilisateur>(`${API_BASE_URL}${API_UTILISATEUR}/`, utilisateur);
  }

  modifUtilisateur(utilisateur: Utilisateur) {
    return this.http.put<Utilisateur>(`${API_BASE_URL}${API_UTILISATEUR}/${utilisateur.id}`, utilisateur);
  }
}
