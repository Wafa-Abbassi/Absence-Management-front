import {Component, OnInit} from '@angular/core';
import {debounceTime} from 'rxjs/operators';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {isGreaterThanTodayValidator} from '../validators/validators';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {FerieRtt} from '../model/ferie_rtt';
import * as moment from 'moment';
import {ferieRttType} from '../model/EnumFerieRttType';
import {FerieService} from '../services/ferie.service';
import {RttService} from '../services/rtt.service';
import {Rtt} from '../model/rtt';
import {statut} from '../model/EnumStatut';
import {Ferie} from '../model/ferie';

@Component({
  selector: 'app-creation-ferie-rtt',
  templateUrl: './creation-ferie-rtt.component.html',
  styleUrls: ['./creation-ferie-rtt.component.css'],
  providers: [
    FerieService,
    RttService
  ]
})
export class CreationFerieRttComponent implements OnInit {


  successMessage: string;
  dateCtrl: FormControl;
  date = {year: 0, month: 0, day: 0};
  userForm: FormGroup;
  ferieRtt = new FerieRtt(null, null, null, '');
  model: NgbDateStruct;
  private _success = new Subject<string>();

  constructor(fb: FormBuilder, private ferieService: FerieService, private rttService: RttService) {
    this.dateCtrl = fb.control('', [Validators.required, isGreaterThanTodayValidator]);
    this.userForm = fb.group({
      date: this.dateCtrl
    });
  }

  // Fonction utilisée pour griser les jours passés (jour courant inclus)
  avantDate(date: NgbDateStruct) {
    const dateFormat = new Date(date.year, date.month - 1, date.day);
    return moment().isAfter(dateFormat);
  }

  handleSubmit() {
    this.ferieRtt.date = new Date(Date.UTC(this.date.year, this.date.month - 1, this.date.day));
    if (this.ferieRtt.type == ferieRttType.RTT) {
      this.rttService.addRtt(new Rtt(null, this.ferieRtt.date, this.ferieRtt.commentaire, statut.INITIALE)).subscribe();
    }
    else {
      this.ferieService.addFerie(new Ferie(null, this.ferieRtt.date, this.ferieRtt.commentaire)).subscribe();
    }
  }

  ngOnInit() {
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null);
  }

  public changeSuccessMessage() {
    this._success.next(`La création a bien été réalisé.`);
  }
}
