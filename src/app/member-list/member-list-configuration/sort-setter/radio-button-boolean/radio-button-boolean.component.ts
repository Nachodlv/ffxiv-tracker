import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {NgTemplateOutlet} from '@angular/common';

@Component({
  selector: 'app-radio-button-boolean',
  templateUrl: './radio-button-boolean.component.html',
  styleUrls: ['./radio-button-boolean.component.scss']
})
export class RadioButtonBooleanComponent implements OnInit {

  @Input() value = true;
  @Input() trueText: TemplateRef<any>;
  @Input() falseText: TemplateRef<any>;
  @Input() name: string;
  @Output() valueChange = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  valueChanged(newValue: boolean): void {
    this.value = newValue;
    this.valueChange.emit(newValue);
  }

}
