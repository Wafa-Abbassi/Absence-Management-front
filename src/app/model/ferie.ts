import {FerieRtt} from './ferie_rtt';
import {ferieRttType} from './EnumFerieRttType';

export class Ferie extends FerieRtt {
  constructor(public id: number, public date: Date, public commentaire: string) {
    super(id, date, ferieRttType.FERIE, commentaire);
  }
}
