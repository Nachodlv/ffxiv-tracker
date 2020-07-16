import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MountPack, Packs} from '../../models/mount-pack';
import {Observable} from 'rxjs';
import {Mount} from '../../models/mount';
import {ItemService} from '../../services/item-service/item.service';

@Component({
  selector: 'app-pack-selector',
  templateUrl: './pack-selector.component.html',
  styleUrls: ['./pack-selector.component.scss']
})
export class PackSelectorComponent implements OnInit {

  packs: { mountPack: MountPack, selected: boolean }[] = [];

  @Output() packSelected = new EventEmitter<MountPack>();

  constructor(
    private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.initializePacks();

  }

  initializePacks(): void {
    this.packs = Packs.map(pack => {
      return {
        mountPack: pack, selected: false
      };
    });
    this.packs.forEach(pack => {
      const observables: Observable<Mount>[] = [];
      pack.mountPack.ids.forEach(mount => {
        this.itemService.fetchMount(mount);
        observables.push(this.itemService.getMount(mount));
      });
      pack.mountPack.mounts$ = observables;
    });
  }

  checkboxClicked(event: any, packSelected: { mountPack: MountPack, selected: boolean }): void {
    packSelected.selected = event.target.checked;
    if (packSelected.selected) {
      this.packs.forEach(pack => {
        if (pack !== packSelected) {
          pack.selected = false;
        }
      });
      this.packSelected.emit(packSelected.mountPack);
    } else {
      this.packSelected.emit(undefined);
    }
  }
}
