import {Component, OnInit} from '@angular/core';
import {Absence} from '../model/absence';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AbsenceService} from '../services/AbsenceService';
import {statut} from '../model/EnumStatut';


@Component({
  selector: 'app-absences-management',
  templateUrl: './absences-management.component.html',
  styleUrls: ['./absences-management.component.css'],
})
export class AbsencesManagementComponent implements OnInit {

  closeResult: string;
  absences: Array<Absence>;
  init = statut.INITIALE;
  constructor(private modalService: NgbModal, private service: AbsenceService) {
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
  deleteAbsence(absences: Absence) {
    this.absences.splice(this.absences.indexOf(absences), 1);
    return this.service.deleteAbsenceId(absences).subscribe();
  }

  ngOnInit() {
    this.service.getAbsences().subscribe(abs => {
      this.absences = abs;
    });
  }
}
