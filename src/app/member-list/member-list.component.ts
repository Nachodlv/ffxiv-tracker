import {Component, OnInit} from '@angular/core';
import {FreeCompanyService} from '../services/free-company-service/free-company.service';
import {forkJoin, Observable} from 'rxjs';
import {Player} from '../models/player';
import {tap} from 'rxjs/operators';
import {CharacterService} from '../services/character-service/character.service';
import {MountPack, Packs} from '../models/mount-pack';
import {ItemService} from '../services/item-service/item.service';
import {Mount} from '../models/mount';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  players$: Observable<Player[]>;
  packs: { mountPack: MountPack, selected: boolean }[] = [];
  packSelected: MountPack | undefined;

  constructor(private freeCompanyService: FreeCompanyService,
              private characterService: CharacterService,
              private itemService: ItemService) {
  }

  ngOnInit(): void {
    this.freeCompanyService.getCompanyMembers();
    this.players$ = this.freeCompanyService.members$.pipe(tap(players => {
      players.forEach(player => {
        this.characterService.fetchCharacterMounts(player.id);
        player.mounts = this.characterService.getPlayerMount(player.id);
      });
    }));


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
      this.packSelected = packSelected.mountPack;
    } else {
      this.packSelected = undefined;
    }
  }

}
