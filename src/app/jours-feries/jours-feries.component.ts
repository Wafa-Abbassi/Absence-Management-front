import {Component, OnInit} from '@angular/core';
import {FerieRtt} from '../model/ferie_rtt';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RttService} from '../services/rtt.service';
import {FerieService} from '../services/ferie.service';
import * as moment from 'moment';
import {statut} from '../model/EnumStatut';


@Component({
  selector: 'app-jours-feries',
  templateUrl: './jours-feries.component.html',
  styleUrls: ['./jours-feries.component.css'],
  providers: [
    RttService,
    FerieService
  ]
})
export class JoursFeriesComponent implements OnInit {

  ferieRtts: FerieRtt[] = [];
  dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
  anneeAfficher = new Date().getUTCFullYear();
  annees: Array<number> = [
    this.anneeAfficher
  ];
  init = statut.INITIALE;

  closeResult: string;


  constructor(private modalService: NgbModal, private serviceRtt: RttService, private serviceFerie: FerieService) {
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteFerieRtt(ferieRtt: FerieRtt) {
    this.ferieRtts.splice(this.ferieRtts.indexOf(ferieRtt), 1);
    return (ferieRtt.type == 'Férié')
      ? this.serviceFerie.deleteFerieId(ferieRtt.id).subscribe()
      : this.serviceRtt.deleteRttId(ferieRtt.id).subscribe();
  }

  isNotInPast(date: Date) {
    const dateJour = new Date();

    if (moment(dateJour).isBefore(date)) {
      return true;
    }
    return false;
  }

  changeYear(annee) {
    this.anneeAfficher = annee;
    this.serviceFerie.getFeriesByYear(this.anneeAfficher).toPromise().then(feries => {
      feries.forEach(f => f.date = new Date(f.date));
      this.ferieRtts = feries;
    }).then(() =>
      this.serviceRtt.getRttsByYear(this.anneeAfficher).toPromise().then(rtts => {
          rtts.forEach(r => r.date = new Date(r.date));
          this.ferieRtts.push(...rtts);
        }
      ).then(() => {
          this.ferieRtts.sort((ferieRtt, ferieRtt2) => {
            if (moment(ferieRtt.date).isBefore(ferieRtt2.date)) {
              return -1;
            } else {
              return 1;
            }
          });
        }
      )
    );
  }

  ngOnInit() {
    this.changeYear(this.anneeAfficher);

    this.serviceFerie.getYears().toPromise().then(annees => {
        this.annees.push(...annees);
      }
    ).then(() => {
      this.serviceRtt.getYears().toPromise().then(annees => {
          this.annees.push(...annees);
        }
      ).then(() => {
        let tabTemp = [];
        for (let annee of this.annees) {
          if (!tabTemp.includes(annee)) {
            tabTemp.push(annee);
          }

        }
        this.annees = tabTemp.sort();
      });
    });

  }


}
