import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FreeCompanyService} from '../services/free-company-service/free-company.service';
import {Observable, Subscription} from 'rxjs';
import {Player} from '../models/player';
import {map, tap} from 'rxjs/operators';
import {CharacterService} from '../services/character-service/character.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ItemType} from '../models/item';
import {FreeCompany} from '../models/free-company';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {MountPacks} from '../models/packs/mount-packs';
import {ItemPack} from '../models/packs/item-pack';
import {MinionPacks} from '../models/packs/minion-packs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit, OnDestroy {

  freeCompany$: Observable<FreeCompany>;
  players: Player[] = [];
  packSelected: ItemPack | undefined;
  itemTypeSelected: ItemType = ItemType.Mount;
  itemType = ItemType;
  searchInput = '';
  mountsPacks: ItemPack[] = [];
  minionsPacks: ItemPack[] = [];
  totalPlayers = 0;
  playersLoaded = 0;

  private playersInitialized = 0;
  private playerSearch = new Map<string, PlayerSearch>();
  private paramsSubscription: Subscription;
  private playerSubscriptions: Subscription[] = [];
  private companyMembersSubscription: Subscription;

  constructor(private freeCompanyService: FreeCompanyService,
              private characterService: CharacterService,
              private spinner: NgxSpinnerService,
              private changeDetector: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.mountsPacks = MountPacks;
    this.minionsPacks = MinionPacks;
  }

  ngOnInit(): void {
    this.spinner.show();

    this.paramsSubscription = this.activatedRoute.paramMap.subscribe(params => {
      const fcId = params.get('id');
      if (!fcId) {
        this.router.navigate([]);
      }
      this.freeCompany$ = this.freeCompanyService.getFreeCompanyById(fcId);
      this.companyMembersSubscription = this.freeCompanyService.getCompanyMembers(fcId).subscribe((players: Player[]) => {
          players.forEach(player => this.playerSearch.set(player.id, new PlayerSearch()));
          this.players = players;
          this.totalPlayers = players.length;
          this.playersInitialized = 0;
          this.playersLoaded = 0;
          this.playerSubscriptions.forEach(sub => sub.unsubscribe());
          this.initializePlayers(players);
        }
      );
    });
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
    const currentInitialized = this.playersInitialized;
    this.playersInitialized += playersToInitialize;
    for (let i = currentInitialized; i < Math.min(currentInitialized + playersToInitialize, players.length); i++) {
      players[i].extraInformation$ = this.characterService.getPlayerExtraInformation(players[i].id);
      this.playerSubscriptions.push(players[i].extraInformation$.subscribe((info) => {
          this.playersLoaded++;
          if (this.playersInitialized < players.length) {
            this.initializePlayers(players);
          }
        }, error => console.log(`Error loading player info. ${error}`)
      ));
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.playerSubscriptions.forEach(s => s.unsubscribe());
    this.companyMembersSubscription?.unsubscribe();
  }

}

class PlayerSearch {
  constructor(public emptyPack: boolean = true, public emptyItems: boolean = true) {
  }
}
