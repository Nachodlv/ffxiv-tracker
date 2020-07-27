import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../../models/item';

@Component({
  selector: 'app-item-icon',
  templateUrl: './item-icon.component.html',
  styleUrls: ['./item-icon.component.scss']
})
export class ItemIconComponent implements OnInit {
  @Input() item: Item;
  @Input() mountAvailable = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
