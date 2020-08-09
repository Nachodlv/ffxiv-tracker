import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {Item} from '../../models/item';
import {SearchItemsPipe} from '../../pipes/search-items.pipe';
import {forkJoin, Subscription} from 'rxjs';
import {ItemPack} from '../../models/packs/item-pack';

@Component({
  selector: 'app-pack-list',
  templateUrl: './pack-list.component.html',
  styleUrls: ['./pack-list.component.scss'],
  providers: [SearchItemsPipe]
})
export class PackListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() packSelected: ItemPack;
  @Input() playerNameMatched = false;
  @Input() items: Item[] = [];
  @Input() searchInput: string;

  @Output() isEmpty = new EventEmitter<boolean>();

  itemsFiltered: Item[] = [];
  loaded = false;
  packItems: Item[] = [];

  private subscription: Subscription;

  constructor(private searchItemsPipe: SearchItemsPipe) {
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
    this.subscription.unsubscribe();
  }

  private searchInputChanged(newSearchInput: string): void {
    if (this.playerNameMatched) {
      return;
    }
    this.itemsFiltered = this.searchItemsPipe.transform(this.packItems, newSearchInput);
    this.isEmpty.emit(this.itemsFiltered.length === 0);
  }

  private packSelectedChange(newPack: ItemPack): void {
    this.loaded = false;
    this.packItems = [];

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = newPack.items$.subscribe(items => {
      this.packItems = items;
      this.loaded = true;
      this.searchInputChanged(this.searchInput);
    });
  }

}
