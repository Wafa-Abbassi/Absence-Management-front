import {Component, OnInit} from '@angular/core';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {isGreaterThanTodayValidator} from "../validators/validators";
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import * as moment from 'moment';
import {AbsenceService} from "../services/AbsenceService";
import {Absence} from "../model/absence";
import {statut} from "../model/EnumStatut";

@Component({
  selector: 'app-demande-absence',
  templateUrl: './demande-absence.component.html',
  styleUrls: ['./demande-absence.component.css'],
  providers: [
    FormBuilder
  ]
})
export class DemandeAbsenceComponent implements OnInit {

  private _success = new Subject<string>();
  successMessage: string;

  dateDebCtrl: FormControl;
  dateFinCtrl: FormControl;
  userForm: FormGroup;
  date1={year:0,month:0,day:0};
  date2={year:0,month:0,day:0};

  absence= new Absence(null, new Date(), null, null, null, statut.INITIALE);

  model: NgbDateStruct;

  //Fonction utilisée pour griser les jours passés (jour courant inclus)
  avantDate(date: NgbDateStruct) {
    let dateFormat = new Date(date.year, date.month - 1, date.day);
    return moment().isAfter(dateFormat);
  }




  constructor(fb: FormBuilder, private absService: AbsenceService) {
    this.dateDebCtrl = fb.control('', [Validators.required, isGreaterThanTodayValidator]);
    this.dateFinCtrl = fb.control('', [Validators.required, isGreaterThanTodayValidator]);
    this.userForm = fb.group({
      dateDeb: this.dateDebCtrl,
      dateFin: this.dateFinCtrl
    });
  }

  handleSubmit() {
    this.absence.dateDebut = new Date(Date.UTC(this.date1.year, this.date1.month - 1, this.date1.day));
    this.absence.dateFin = new Date(Date.UTC(this.date2.year, this.date2.month - 1, this.date2.day));
    this.absService.putAbsence(this.absence).subscribe();
  }

  ngOnInit() {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
  }
  public changeSuccessMessage() {
    this._success.next(`La demande d'absence a bien été envoyée.`);
  }
}
