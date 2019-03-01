import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {Ferie} from '../model/ferie';
import {FerieService} from '../services/ferie.service';
import {RttService} from '../services/rtt.service';
import {Rtt} from '../model/rtt';

export interface CalendarDate {
  mDate: moment.Moment;
  selected?: boolean;
  today?: boolean;
}

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit, OnChanges {

  currentDate = moment().locale('fr');
  dayNames = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  weeks: CalendarDate[][] = [];
  sortedDates: CalendarDate[] = [];
  feries: Array<Ferie> = [];
  rtts: Array<Rtt> = [];
  dateFeries: Array<Date> = [];
  dateRtts: Array<Date> = [];
  jourFeries: Array<number> = [];
  jourRtts: Array<number> = [];

  @Input() selectedDates: CalendarDate[] = [];
  @Output() onSelectDate = new EventEmitter<CalendarDate>();

  constructor(private ferieService: FerieService, private rttService: RttService) {
  }

  ngOnInit(): void {
    this.setJourFeries();
    this.setJourRtt();
    this.generateCalendar();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedDates &&
      changes.selectedDates.currentValue &&
      changes.selectedDates.currentValue.length > 1) {
      // sort on date changes for better performance when range checking
      this.sortedDates = _.sortBy(changes.selectedDates.currentValue, (m: CalendarDate) => m.mDate.valueOf());
      this.generateCalendar();
    }
  }

  // date checkers
  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return _.findIndex(this.selectedDates, (selectedDate) => {
      return moment(date).isSame(selectedDate.mDate, 'day');
    }) > -1;
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(date: CalendarDate): void {
    this.onSelectDate.emit(date);
  }

  // actions from calendar
  prevMonth(): void {
    if (moment(this.currentDate).subtract(1, 'months').year() !== this.currentDate.year()) {
      this.currentDate = moment(this.currentDate).subtract(1, 'months');
      this.setJourFeries();
      this.setJourRtt();
    } else {
      this.currentDate = moment(this.currentDate).subtract(1, 'months');
      this.getFerieMois();
      this.getRttMois();
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (moment(this.currentDate).add(1, 'months').year() !== this.currentDate.year()) {
      this.currentDate = moment(this.currentDate).add(1, 'months');
      this.setJourFeries();
      this.setJourRtt();
    } else {
      this.currentDate = moment(this.currentDate).add(1, 'months');
      this.getFerieMois();
      this.getRttMois();
    }
    this.generateCalendar();
  }

  firstMonth(): void {
    this.currentDate = moment(this.currentDate).startOf('year');
    this.generateCalendar();
  }

  lastMonth(): void {
    this.currentDate = moment(this.currentDate).endOf('year');
    this.generateCalendar();
  }

  prevYear(): void {
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.setJourFeries();
    this.setJourRtt();
    this.generateCalendar();
  }

  nextYear(): void {
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.setJourFeries();
    this.setJourRtt();
    this.generateCalendar();
  }

  // generate the calendar grid
  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 1) {
      weeks.push(dates.splice(0, 7));
    }

    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment).startOf('month').day();
    const firstDayOfGrid = moment(currentMoment).startOf('month').subtract(firstOfMonth - 1, 'days');
    let start = firstDayOfGrid.date();
    start = (firstOfMonth === 0) ? start - 7 : start;
    return _.range(start, start + 42)
      .map((date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          selected: this.isSelected(d),
          mDate: d,
        };
      });
  }

  setJourFeries(): void {
    this.feries = [];
    this.dateFeries = [];
    this.ferieService.getFeriesByYear(this.currentDate.year()).toPromise().then(data => this.feries = data)
      .then(() => {
        for (let ferie of this.feries) {
          ferie.date = new Date(ferie.date);
          this.dateFeries.push(ferie.date);
        }
        this.getFerieMois();
      });
  }

  getFerieMois(): void {
    this.jourFeries = [];
    for (let date of this.dateFeries) {
      if (date.getMonth() === this.currentDate.month()) {
        this.jourFeries.push(date.getDate());
      }
    }
  }

  setJourRtt(): void {
    this.rtts = [];
    this.dateRtts = [];
    this.rttService.getRttsByYear(this.currentDate.year()).toPromise().then(data => this.rtts = data)
      .then(() => {
        for (let rtt of this.rtts) {
          rtt.date = new Date(rtt.date);
          this.dateRtts.push(rtt.date);
        }
        this.getRttMois();
      });
  }

  getRttMois(): void {
    this.jourRtts = [];
    for (let date of this.dateRtts) {
      if (date.getMonth() === this.currentDate.month()) {
        this.jourRtts.push(date.getDate());
      }
    }
  }
}
