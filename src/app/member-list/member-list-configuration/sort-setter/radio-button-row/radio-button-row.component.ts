import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-radio-button-row',
  templateUrl: './radio-button-row.component.html',
  styleUrls: ['./radio-button-row.component.scss']
})
export class RadioButtonRowComponent implements OnInit {

  @Input() elements: string[];
  @Input() name: string;
  @Input() elementSelected: string;
  @Output() elementSelectedChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  selectElement(element: string): void {
    this.elementSelectedChange.emit(element);
  }

}
