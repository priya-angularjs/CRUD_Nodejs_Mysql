import { Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';

export interface Item { id: number;
  title: string;
  start: string;
  end: string;
  allDay: true;
  color: string;
}

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  events: any[];
  header: any;
  color: string;
  calendarData: any[];
  addEventForm: FormGroup;
  eventDate: string;
  display = false;
  availableColors = [
    { name: 'none', color: '#9F48C2' },
    { name: 'Primary', color: '#605ca8' },
    { name: 'Accent', color: '#ff851b' },
    { name: 'Warn', color: '#3c8dbc' }
  ];
  locations = [];
  locationArray = [];
  calendarArray = [];
  constructor(fb: FormBuilder, private http: HttpClient, private authenticationService: AuthenticationService, private router: Router) {
    this.addEventForm = fb.group({
      title: [''],
      startDate: [''],
      endDate: [''],
      location: ['']
    });
  }
  ngOnInit() {
    this.getEvent();
    this.http
      .get('/assets/scheduleEvent.json')
      .map(data => data as Array<Item>)
      .subscribe(data => {
        this.events = data;
      });
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    };
  }
  dayClickEvent(event) {
    this.display = true;
    this.eventDate = event.date._d;
  }
  add() {
    this.availableColors.push({
      name: this.addEventForm.controls['title'].value, color: this.color,
    });
    this.calendarData.push({'id': 54, title: this.addEventForm.controls['title'].value, start: this.addEventForm.controls['startDate'].value,
      end: this.addEventForm.controls['endDate'].value, color: this.color});
    this.display = false;
  }
  select(data: any) {
    this.color = data;
  }
  reset() {
    this.addEventForm.reset();
  }
  getEvent() {
    this.authenticationService.getEvent().subscribe(Res => {
      this.calendarArray = Res.records;
      this.calendarData = [];
      this.locations = [];
      for (let i = 0; i < this.calendarArray.length; i++) {
        this.calendarData.push({
          id: this.calendarArray[i].Id, title: this.calendarArray[i].Subject,
          start: this.calendarArray[i].StartDateTime, end: this.calendarArray[i].EndDateTime, locationData: this.calendarArray[i].Location
        });
        if (this.locationArray.indexOf(this.calendarArray[i].Location) === -1 && this.calendarArray[i].Location !== null) {
          this.locationArray.push(this.calendarArray[i].Location);
        }
      }
      for (let j = 0; j < this.locationArray.length; j++) {
        this.locations.push({
          label: this.locationArray[j],
          value: this.locationArray[j]
        });
      }
      console.log(this.calendarData);
    });
  }
  locationEvent (event) {
    this.calendarData = [];
    for (let k = 0; k < this.calendarArray.length; k++) {
      if (this.calendarArray[k].Location !== null && this.calendarArray[k].Location !== undefined) {
        if (this.calendarArray[k].Location === event.value.value) {
          this.calendarData.push({
            id: this.calendarArray[k].Id, title: this.calendarArray[k].Subject,
            start: this.calendarArray[k].StartDateTime, end: this.calendarArray[k].EndDateTime, locationData: this.calendarArray[k].Location
          });
        }
      }
    }
  }
  addEvent(model: FormGroup) {
    this.authenticationService.addEvent(model.value).subscribe(Res => {
      if (Res.success = true) {
        this.getEvent();
      }
    });
  }

}
