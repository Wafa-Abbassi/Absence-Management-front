import {FormControl} from "@angular/forms";
import * as moment from 'moment';

export function isGreaterThanTodayValidator(control: FormControl) {
  let date = control.value;
  console.log(date);
  let retour=null;
  if (date!==null) {
    let dateFormat = new Date(date.year, date.month - 1, date.day);
    retour = moment().isAfter(dateFormat) ? {isGreaterThanToday: true} : null;
  }
  return retour;
}
