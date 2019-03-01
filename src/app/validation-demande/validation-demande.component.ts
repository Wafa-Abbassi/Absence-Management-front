import {Component, OnInit} from '@angular/core';
import {Absence} from '../model/absence';
import {AbsenceService} from '../services/AbsenceService';
import {UtilisateurService} from '../services/utilisateur.service';
import Utilisateur from '../model/utilisateur';
import {statut} from '../model/EnumStatut';

@Component({
  selector: 'app-validation-demande',
  templateUrl: './validation-demande.component.html',
  styleUrls: ['./validation-demande.component.css']
})
export class ValidationDemandeComponent implements OnInit {
  absences: Array<Absence>;
  wait = statut.EN_ATTENTE_VALIDATION;
  utilisateur: Utilisateur = this.utilisateurService.getUtilisateurCourant();

  constructor(private service: AbsenceService, private utilisateurService: UtilisateurService) {
  }

  ValideAbsence(absence: Absence) {
    absence.statut = statut.VALIDEE;
    return this.service.updateAbsence(absence).subscribe();
  }

  RefusAbsence(absence: Absence) {
    absence.statut = statut.REJETEE;
    return this.service.updateAbsence(absence).subscribe();
  }

  ngOnInit() {
    this.service.getAbsences().subscribe(abs => {
      this.absences = abs;
    });

  }
}
