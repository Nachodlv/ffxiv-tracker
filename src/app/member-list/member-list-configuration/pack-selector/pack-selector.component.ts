import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ItemPack} from '../../../models/packs/item-pack';
import {ItemService} from '../../../services/item-service/item.service';
import {ItemType} from '../../../models/item';

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
      this.packCheckBoxes = packs.currentValue.map(pack => new PackCheckBox(pack));
      this.packSelected = this.defaultPack;
    }
  }

  checkboxClicked(packSelected: PackCheckBox): void {
    if (!packSelected.initialized) {
      if (packSelected.itemPack.ids.length > 0) {
        this.initializePack(packSelected);
      }
      else {
        this.initializeAllPack(packSelected);
      }
    }
    this.packSelected = packSelected;
    this.packSelectedChange.emit(packSelected.itemPack);
  }

  private initializePack(pack: PackCheckBox): void {
    pack.itemPack.items$ =
      pack.itemPack.type === ItemType.Mount ?
        this.itemService.getMounts(pack.itemPack.ids) :
        this.itemService.getMinions(pack.itemPack.ids);
    pack.initialized = true;
  }

  private initializeAllPack(pack: PackCheckBox): void {
    pack.itemPack.items$ =
      pack.itemPack.type === ItemType.Mount ?
        this.itemService.getAllMounts() :
        this.itemService.getAllMinions();
    pack.initialized = true;
  }

}

class PackCheckBox {
  constructor(public itemPack: ItemPack | undefined, public initialized: boolean = false) {
  }
}
