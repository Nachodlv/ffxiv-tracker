import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MountPack, Packs} from '../../models/mount-pack';
import {Observable} from 'rxjs';
import {Item} from '../../models/item';
import {ItemService} from '../../services/item-service/item.service';

@Component({
  selector: 'app-pack-selector',
  templateUrl: './pack-selector.component.html',
  styleUrls: ['./pack-selector.component.scss']
})
export class PackSelectorComponent implements OnInit {
  packs: PackCheckBox[] = [];

  @Output() packSelected = new EventEmitter<MountPack>();

  @Input('packs') set setPacks(packs: MountPack[]) {
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
      this.packSelected.emit(packSelected.mountPack);
    } else {
      this.packSelected.emit(undefined);
    }
  }

  private initializePack(pack: PackCheckBox): void {
    const observables: Observable<Item>[] = [];
    pack.mountPack.ids.forEach(mount => {
      observables.push(this.itemService.getMount(mount));
    });
    pack.mountPack.mounts$ = observables;
    pack.initialized = true;
  }
}

class PackCheckBox {
  constructor(public mountPack: MountPack, public selected: boolean = false, public initialized: boolean = false) {
  }
}
