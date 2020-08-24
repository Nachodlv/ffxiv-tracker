import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ItemType} from '../../models/item';
import {PlayerSort, SortOrder} from '../../models/sort-order';
import {MountPacks} from '../../models/packs/mount-packs';
import {MinionPacks} from '../../models/packs/minion-packs';
import {ItemPack} from '../../models/packs/item-pack';

@Component({
  selector: 'app-member-list-configuration',
  templateUrl: './member-list-configuration.component.html',
  styleUrls: ['./member-list-configuration.component.scss']
})
export class MemberListConfigurationComponent implements OnInit {

  @Output() searchInputChange = new EventEmitter<string>();
  @Output() itemTypeChange = new EventEmitter<ItemType>();
  @Output() packSelectedChange = new EventEmitter<ItemPack>();
  @Output() sortChange = new EventEmitter<SortOrder>();

  searchInput = '';
  itemType = ItemType;
  itemTypeSelected = ItemType.Mount;
  sort = new SortOrder();
  mountsPacks = MountPacks;
  minionsPacks = MinionPacks;
  packSelected: ItemPack;

  constructor() {
  }

  ngOnInit(): void {
  }

  changeItemType(itemType: ItemType): void {
    this.itemTypeSelected = itemType;
    this.itemTypeChange.emit(itemType);
    this.changePackSelected(undefined);
    this.sortChange.emit(this.sort);
  }

  changePackSelected(itemPack: ItemPack): void {
    this.packSelected = itemPack;
    this.packSelectedChange.emit(itemPack);
    this.sortChange.emit(this.sort);
  }

  changeSort(sort: SortOrder): void {
    this.sort = sort;
    this.sortChange.emit(sort);
  }

  changeSearchInput(searchInput: string): void {
    this.searchInput = searchInput;
    this.searchInputChange.emit(searchInput);
  }
}
