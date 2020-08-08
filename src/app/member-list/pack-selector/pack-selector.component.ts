import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs';
import {Item, ItemType} from '../../models/item';
import {ItemService} from '../../services/item-service/item.service';
import {ItemPack} from '../../models/packs/item-pack';

@Component({
  selector: 'app-pack-selector',
  templateUrl: './pack-selector.component.html',
  styleUrls: ['./pack-selector.component.scss']
})
export class PackSelectorComponent implements OnInit, OnChanges {

  @Output() packSelectedChange = new EventEmitter<ItemPack>();

  @Input() private packs: ItemPack[];

  defaultPack = new PackCheckBox(undefined, true);
  packSelected: PackCheckBox = this.defaultPack;
  packCheckBoxes: PackCheckBox[] = [];

  constructor(
    private itemService: ItemService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const packs = changes.packs;
    if (packs && packs.currentValue !== packs.previousValue) {
      console.log('Packs changed!');
      this.packCheckBoxes = packs.currentValue.map(pack => new PackCheckBox(pack));
      this.packSelected = this.defaultPack;
    }
  }

  checkboxClicked(packSelected: PackCheckBox ): void {
    if (!packSelected.initialized) {
      this.initializePack(packSelected);
    }
    this.packSelected = packSelected;
    this.packSelectedChange.emit(packSelected.itemPack);
  }

  private initializePack(pack: PackCheckBox): void {
    const observables: Observable<Item>[] = [];
    pack.itemPack.ids.forEach(item => {
      observables.push(pack.itemPack.type === ItemType.Mount ?
        this.itemService.getMount(item) :
        this.itemService.getMinion(item));
    });
    pack.itemPack.items$ = observables;
    pack.initialized = true;
  }


}

class PackCheckBox {
  constructor(public itemPack: ItemPack | undefined, public initialized: boolean = false) {
  }
}
