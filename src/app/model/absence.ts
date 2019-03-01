import {typeEnum} from './typeEnum';
import {statut} from './EnumStatut';

export class Absence {
  constructor(public id: Number, public dateDebut: Date, public dateFin: Date, public type: typeEnum, public motif: String, public statut: statut) {
  }
}
