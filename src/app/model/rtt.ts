import {FerieRtt} from './ferie_rtt';
import {ferieRttType} from './EnumFerieRttType';

export class Rtt extends FerieRtt {
  constructor(public id: number, public date: Date, public commentaire: string, public statut: string) {
    super(id, date, ferieRttType.RTT, commentaire);
  }
}
