import {Component, Input, OnInit} from '@angular/core';
import {FreeCompany} from '../../models/free-company';

@Component({
  selector: 'app-fc-card',
  templateUrl: './fc-card.component.html',
  styleUrls: ['./fc-card.component.scss']
})
export class FcCardComponent implements OnInit {

  @Input() freeCompany: FreeCompany;

  constructor() {
  }

  ngOnInit(): void {
  }

}
