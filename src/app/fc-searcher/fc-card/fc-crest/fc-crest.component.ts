import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fc-crest',
  templateUrl: './fc-crest.component.html',
  styleUrls: ['./fc-crest.component.scss']
})
export class FcCrestComponent implements OnInit {

  @Input() crest: string[];
  constructor() { }

  ngOnInit(): void {
  }

}
