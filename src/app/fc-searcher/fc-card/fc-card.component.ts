import {Component, Input, OnInit} from '@angular/core';
import {FreeCompany} from '../../models/free-company';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fc-card',
  templateUrl: './fc-card.component.html',
  styleUrls: ['./fc-card.component.scss']
})
export class FcCardComponent implements OnInit {

  @Input() freeCompany: FreeCompany;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  cardClicked(): void {
    this.router.navigate(['fc', this.freeCompany.id]);
  }
}
