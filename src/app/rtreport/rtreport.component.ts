import { Component, OnInit, OnDestroy } from '@angular/core';

// Service
import { RtreportService } from '../services/rtreport.service';
// Models
import { Rtreport } from '../models/rtreport';

@Component({
  selector: 'app-rtreport',
  templateUrl: './rtreport.component.html',
  styleUrls: ['./rtreport.component.css']
})
export class RtreportComponent implements OnInit {

    rtreports: Rtreport[] = [];

    private Interval: any;

    constructor(
      private rtreportService: RtreportService
    ) { }

    ngOnInit() {

    }

    ngOnDestroy() {
        clearInterval(this.Interval);
    }

}
