import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ItemSort, PlayerSort, SortOrder} from '../../../models/sort-order';

@Component({
  selector: 'app-sort-setter',
  templateUrl: './sort-setter.component.html',
  styleUrls: ['./sort-setter.component.scss']
})
export class SortSetterComponent implements OnInit, OnChanges {

  @Input() sort: SortOrder;
  @Output() sortChange = new EventEmitter<SortOrder>();

  playerSortValues: string[] = [];
  playerSortSelected: string;
  itemSortValues: string[] = [];
  itemSortSelected: string;
  showSortConfig = false;

  constructor() {
  }

  ngOnInit(): void {
    this.playerSortValues = Object.values(PlayerSort);
    this.itemSortValues = Object.values(ItemSort);
  }

  playerSortChanged(playerSort: string): void {
    const key = Object.keys(PlayerSort).find(k => PlayerSort[k].toString() === playerSort);
    this.sort.playerSort = (PlayerSort)[key];
    this.sortChange.emit(this.sort);
  }

  itemSortChanged(itemSort: string): void {
    const key = Object.keys(ItemSort).find(k => ItemSort[k].toString() === itemSort);
    this.sort.itemSort = ItemSort[key];
    this.sortChange.emit(this.sort);
  }

  toggleSortConfig(): void {
    this.showSortConfig = !this.showSortConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const sortChange = changes.sort;
    if (!sortChange) {
      return;
    }
    const sorOrder = sortChange.currentValue as SortOrder;
    this.playerSortSelected = sorOrder.playerSort.toString();
    this.itemSortSelected = sorOrder.itemSort.toString();
  }

}
