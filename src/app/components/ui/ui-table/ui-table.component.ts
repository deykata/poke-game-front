import { Component, Input, OnInit } from '@angular/core';
import { TableData } from 'src/app/shared/models/table-data';

@Component({
  selector: 'app-ui-table',
  templateUrl: './ui-table.component.html',
  styleUrls: ['./ui-table.component.scss']
})
export class UiTableComponent implements OnInit {
  @Input() data: TableData = {} as TableData;

  constructor() { }

  ngOnInit(): void {
  }

}
