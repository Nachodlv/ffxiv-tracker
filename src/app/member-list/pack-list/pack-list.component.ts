import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {MountPack} from '../../models/mount-pack';
import {Item} from '../../models/item';
import {SearchItemsPipe} from '../../pipes/search-items.pipe';
import {forkJoin, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-pack-list',
  templateUrl: './pack-list.component.html',
  styleUrls: ['./pack-list.component.scss'],
  providers: [SearchItemsPipe]
})
export class PackListComponent implements OnInit, OnChanges, OnDestroy {

  @Input() packSelected: MountPack;
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
    this.subscription = forkJoin(this.packSelected.mounts$).subscribe(items => {
      this.packItems = items;
      this.loaded = true;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.searchInput;
    if (this.playerNameMatched || !change || change.previousValue === change.currentValue) {
      return;
    }

    this.itemsFiltered = this.searchItemsPipe.transform(this.packItems, change.currentValue);
    this.isEmpty.emit(this.itemsFiltered.length === 0);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
