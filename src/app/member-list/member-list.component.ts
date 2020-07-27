import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FreeCompanyService} from '../services/free-company-service/free-company.service';
import {Observable} from 'rxjs';
import {Player} from '../models/player';
import {tap} from 'rxjs/operators';
import {CharacterService} from '../services/character-service/character.service';
import {MountPack, Packs} from '../models/mount-pack';
import {NgxSpinnerService} from 'ngx-spinner';
import {ItemType} from '../models/item';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  players$: Observable<Player[]>;
  packSelected: MountPack | undefined;
  itemTypeSelected: ItemType = ItemType.Mount;
  itemType = ItemType;
  searchInput = '';
  packs: MountPack[] = [];
  totalPlayers = 0;
  playersLoaded = 0;

  private playersInitialized = 0;
  private playerSearch = new Map<string, PlayerSearch>();

  constructor(private freeCompanyService: FreeCompanyService,
              private characterService: CharacterService,
              private spinner: NgxSpinnerService,
              private changeDetector: ChangeDetectorRef) {
    this.packs = Packs;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.freeCompanyService.getCompanyMembers();
    this.players$ = this.freeCompanyService.members$.pipe(tap((players: Player[]) => {
        players.forEach(player => this.playerSearch.set(player.id, new PlayerSearch()));
        this.totalPlayers = players.length;
        this.initializePlayers(players);
      }
    ));
  }

  changeItemType(itemType: ItemType): void {
    this.itemTypeSelected = itemType;
    this.packSelected = undefined;
  }

  getPlayerSearch(playerId: string): PlayerSearch {
    if (this.playerSearch.has(playerId)) {
      return this.playerSearch.get(playerId);
    }
    return new PlayerSearch();
  }

  setEmptyItems(value: boolean, playerId: string): void {
    this.playerSearch.get(playerId).emptyItems = value;
    this.changeDetector.detectChanges();
  }

  setEmptyPack(value: boolean, playerId: string): void {
    this.playerSearch.get(playerId).emptyPack = value;
    this.changeDetector.detectChanges();
  }

  private initializePlayers(players: Player[]): void {
    const playersToInitialize = 4;
    for (let i = this.playersInitialized; i < this.playersInitialized + playersToInitialize && i < players.length; i++) {
      players[i].extraInformation$ = this.characterService.getPlayerExtraInformation(players[i].id).pipe(tap(mounts => {
        this.playersLoaded++;
        this.initializePlayers(players);
      }));
    }
    this.playersInitialized += playersToInitialize;
  }

}

class PlayerSearch {
  constructor(public emptyPack: boolean = true, public emptyItems: boolean = true) {
  }
}
