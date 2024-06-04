import { Component, ViewChild, OnInit } from '@angular/core';
import { CalendarMode, CalendarComponent } from 'ionic6-calendar';
import { IonRouterOutlet, IonModal } from '@ionic/angular';
import { CalEvent, EventsService } from '../services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };

  viewTitle = '';
  eventSource: any[] = [];

  @ViewChild(CalendarComponent) myCal!: CalendarComponent;
  @ViewChild('modal') modal!: IonModal;
  presentingElement: any = null;

  newEvent: any = {
    title: '',
    allDay: false,
    startTime: null,
    endTime: null,
  };

  showStart = false;
  showEnd = false;
  formattedStart = '';
  formattedEnd = '';

  constructor(private ionRouterOutlet: IonRouterOutlet, private eventsService: EventsService) {
    this.presentingElement = ionRouterOutlet.nativeEl;
  }
  async ngOnInit(){
    this.eventSource = await this.eventsService.getData();
    console.log("~file: home.page.ts:46 ~HomePage ~ngOnInit ~this.eventSource:", this.eventSource);
  }

  setToday() {
    this.myCal.currentDate = new Date();
  }

  calendarBack() {
    this.myCal.slidePrev();
  }

  calendarForward() {
    this.myCal.slideNext();
  }

  onTimeSelected(ev: { selectedTime: Date; events: any }) {
    const selected = new Date(ev.selectedTime);
    this.formattedStart = this.formatDate(selected);
    console.log('~file: home.page.ts:58 ~ HomePage ~ onTimeSelected ~ this.formatted:', this.formattedStart);
    this.newEvent.startTime = selected.toISOString();

    selected.setHours(selected.getHours() + 1);
    this.formattedEnd = this.formatDate(selected);
    console.log('~file: home.page.ts:58 ~ HomePage ~ onTimeSelected ~ this.formatted:', this.formattedEnd);

    this.newEvent.endTime = selected.toISOString();

    console.log('Hello', this.newEvent);
    if (this.calendar.mode === 'day' || this.calendar.mode === 'week') {
      this.modal.present();
    }
  }

  startChanged(value: any) {
    this.newEvent.startTime = value;
    this.formattedStart = this.formatDate(new Date(value));
  }
  endChanged(value: any){
    this.newEvent.startTime = value;
    this.formattedStart = this.formatDate(new Date(value));
  }
  scheduleEvent() {
    const toAdd: CalEvent ={
      title: this.newEvent.title,
      startTime: new Date(this.newEvent.startTime),
      endTime: new Date (this.newEvent.endTime),
      allDay: this.newEvent.allDay,
    };
    console.log(
      '~file: home.page.ts:90 ~ HomePage ~ scheduleEvent ~ toAdd:', toAdd
    );
    this.eventSource.push(toAdd);
    this.myCal.loadEvents();
    this.eventsService.addData(toAdd);

    this.newEvent = {
      title: '',
      allDay: false,
      startTime: null,
      endTime: null,

      
    };
    this.modal.dismiss();

    
  }

  openModal() {
    this.modal.present();
  }

  private formatDate(date: Date): string {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}