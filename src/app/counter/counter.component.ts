import {Component, OnInit} from '@angular/core';
import {UtilisateurService} from '../services/utilisateur.service';
import Utilisateur from '../model/utilisateur';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  providers: [
  ]
})
export class CounterComponent implements OnInit {

  utilisateur: Utilisateur = this.utilisateurService.getUtilisateurCourant();

  constructor(private utilisateurService: UtilisateurService) {
  }

  ngOnInit() {
  }

}
