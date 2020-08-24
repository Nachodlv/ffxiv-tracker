import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Item} from '../../models/item';
import {SearchItemsPipe} from '../../pipes/search-items.pipe';
import {forkJoin, Subscription} from 'rxjs';
import {ItemPack} from '../../models/packs/item-pack';
import {HasItemPipe} from '../../pipes/has-item.pipe';
import {SortOrder} from '../../models/sort-order';

@Component({
  selector: 'app-pack-list',
  templateUrl: './pack-list.component.html',
  styleUrls: ['./pack-list.component.scss'],
  providers: [SearchItemsPipe, HasItemPipe]
})
export class PackListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() packSelected: ItemPack;
  @Input() playerNameMatched = false;
  @Input() items: Item[] = [];
  @Input() searchInput: string;
  @Input() sort: SortOrder;

  @Output() packLength = new EventEmitter<number>();

  itemsFiltered: Item[] = [];
  loaded = false;
  packItems: Item[] = [];

  private subscription: Subscription;

  constructor(private searchItemsPipe: SearchItemsPipe, private hasItemsPipe: HasItemPipe) {
  }

  ngOnInit(): void {
    this.packSelectedChange(this.packSelected);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const searchInput = changes.searchInput;
    const packSelected = changes.packSelected;
    if (packSelected && packSelected.previousValue !== packSelected.currentValue) {
      this.packSelectedChange(packSelected.currentValue);
    }
    if (searchInput && searchInput.previousValue !== searchInput.currentValue) {
      this.searchInputChanged(searchInput.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private searchInputChanged(newSearchInput: string): void {
    this.itemsFiltered = this.playerNameMatched ?
      this.packItems :
      this.searchItemsPipe.transform(this.packItems, newSearchInput);
    this.itemsFiltered = this.itemsFiltered.filter(item => this.hasItemsPipe.transform(item, this.items));
    this.packLength.emit(this.itemsFiltered.length);
  }

  private packSelectedChange(newPack: ItemPack): void {
    this.loaded = false;
    this.packItems = [];

    this.subscription?.unsubscribe();
    this.subscription = newPack.items$.subscribe(items => {
      this.packItems = items;
      this.loaded = true;
      this.searchInputChanged(this.searchInput);
    });
  }

}
