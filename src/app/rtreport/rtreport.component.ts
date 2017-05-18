import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
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

    rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
    ];
    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company' }
    ];

    constructor(
      private rtreportService: RtreportService
    ) { }

    ngOnInit() {

    }

    ngOnDestroy() {
        clearInterval(this.Interval);
    }



}
