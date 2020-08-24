import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Item} from '../../models/item';
import {SearchItemsPipe} from '../../pipes/search-items.pipe';
import {ItemSort, SortOrder} from '../../models/sort-order';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  providers: [SearchItemsPipe]
})
export class ItemListComponent implements OnInit, OnChanges {

  @Input() items: Item[] = [];
  @Input() shouldFilter = false;
  @Input() searchInput: string;
  @Input() sort: SortOrder;

  @Output() itemQuantity = new EventEmitter<number>();

  itemFiltered: Item[] = [];

  constructor(private searchItemsPipe: SearchItemsPipe) {
  }

  ngOnInit(): void {
    this.itemQuantity.emit(this.itemFiltered.length);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.searchInput;
    if (!change || change.previousValue === change.currentValue ) {
      return;
    }
    this.itemFiltered = this.shouldFilter ? this.searchItemsPipe.transform(this.items, change.currentValue) : this.items;
    this.itemQuantity.emit(this.itemFiltered.length);
  }

}
