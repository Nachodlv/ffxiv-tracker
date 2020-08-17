import {Component, Input, OnInit} from '@angular/core';
import {Item, ItemType} from '../../models/item';

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

  openXivCollect(): void {
    window.open(
      `https://ffxivcollect.com/${this.item.itemType === ItemType.Mount ? 'mounts' : 'minions'}/${this.item.id}`,
      '_blank');
  }
}
