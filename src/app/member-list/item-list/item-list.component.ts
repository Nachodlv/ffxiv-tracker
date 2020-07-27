import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Item} from '../../models/item';
import {SearchItemsPipe} from '../../pipes/search-items.pipe';

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

  @Output() isEmpty = new EventEmitter<boolean>();

  itemFiltered: Item[];


  constructor(private searchItemsPipe: SearchItemsPipe) {
  }

  ngOnInit(): void {
    if (this.itemFiltered && this.itemFiltered.length === 0) {
      this.isEmpty.emit(true);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.searchInput;
    if (!this.shouldFilter || !change || change.previousValue === change.currentValue || !change.currentValue) {
      return;
    }
    this.itemFiltered = this.searchItemsPipe.transform(this.items, change.currentValue);
    this.isEmpty.emit(this.itemFiltered.length === 0);
  }

}
