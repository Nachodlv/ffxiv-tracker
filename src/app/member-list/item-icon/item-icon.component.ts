import {Component, Input, OnInit} from '@angular/core';
import {Mount} from '../../models/mount';

@Component({
  selector: 'app-item-icon',
  templateUrl: './item-icon.component.html',
  styleUrls: ['./item-icon.component.scss']
})
export class ItemIconComponent implements OnInit {
  @Input() mount: Mount;
  @Input() mountAvailable = true;

  constructor() {
  }

  ngOnInit(): void {
  }

}
