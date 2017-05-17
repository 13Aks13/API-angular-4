import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

// Service
import { DailyreportService } from '../services/dailyreport.service';
import { UserService } from '../services/user.service';

// Models
import { DailyReport } from '../models/dailyreport';
import { User } from '../models/user';

@Component({
  selector: 'app-dialog',
  templateUrl: './dailyreport.component.html',
  styleUrls: ['./dailyreport.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DailyReportComponent implements OnInit {
  model: any = {};

  user: User;
  dailyreport: DailyReport;

  private token: string;

  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
      private dailyReport: DailyreportService,
      private userService: UserService
  ) { }

  ngOnInit() { }

  save() {
     this.token = JSON.parse(localStorage.getItem('currentUser')).token;
     // Get user by token
     this.userService.getUserByToken(this.token).then((user) => {
         this.user = user;
         // Save report to DB
         this.dailyReport.storeDailyReport(this.user.id, 0, this.model.report).then((dailyreport) => {
            this.dailyreport = dailyreport;
            console.log(this.dailyreport);
         });
     });
     this.visible = false;
     this.visibleChange.emit(this.visible);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
