import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Item, ItemType} from '../../models/item';
import {ItemService} from '../../services/item-service/item.service';
import {ItemPack} from '../../models/packs/item-pack';

@Component({
  selector: 'app-pack-selector',
  templateUrl: './pack-selector.component.html',
  styleUrls: ['./pack-selector.component.scss']
})
export class PackSelectorComponent implements OnInit {
  packs: PackCheckBox[] = [];

  @Output() packSelected = new EventEmitter<ItemPack>();

  @Input('packs') set setPacks(packs: ItemPack[]) {
    this.packs = packs.map(pack => new PackCheckBox(pack));
  }

  constructor(
    private itemService: ItemService) {
  }

  ngOnInit(): void {
  }


  checkboxClicked(event: any, packSelected: PackCheckBox): void {
    packSelected.selected = event.target.checked;
    if (packSelected.selected) {
      this.packs.forEach(pack => {
        if (pack !== packSelected) {
          pack.selected = false;
        }
      });
      if (!packSelected.initialized) {
        this.initializePack(packSelected);
      }
      this.packSelected.emit(packSelected.itemPack);
    } else {
      this.packSelected.emit(undefined);
    }
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
  constructor(public itemPack: ItemPack, public selected: boolean = false, public initialized: boolean = false) {
  }
}
