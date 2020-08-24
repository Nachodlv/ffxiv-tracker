import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FreeCompanyService} from '../services/free-company-service/free-company.service';
import {combineLatest, forkJoin, Observable, Subscription} from 'rxjs';
import {Player} from '../models/player';
import {map, take, tap} from 'rxjs/operators';
import {CharacterService} from '../services/character-service/character.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ItemType} from '../models/item';
import {FreeCompany} from '../models/free-company';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {MountPacks} from '../models/packs/mount-packs';
import {ItemPack} from '../models/packs/item-pack';
import {MinionPacks} from '../models/packs/minion-packs';
import {ItemService} from '../services/item-service/item.service';
import {SortOrder} from '../models/sort-order';

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
  totalPlayers = 0;
  playersLoaded = 0;
  sort: SortOrder = new SortOrder();
  playerSearch = new Map<string, PlayerSearch>();
  sortUpdater: boolean;

  private playersInitialized = 0;
  private paramsSubscription: Subscription;
  private playerSubscriptions: Subscription[] = [];
  private companyMembersSubscription: Subscription;

  constructor(private freeCompanyService: FreeCompanyService,
              private characterService: CharacterService,
              private itemService: ItemService,
              private spinner: NgxSpinnerService,
              private changeDetector: ChangeDetectorRef,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.spinner.show();

    this.paramsSubscription = this.activatedRoute.paramMap.subscribe(params => {
      const fcId = params.get('id');
      if (!fcId) {
        this.router.navigate([]);
      }
      this.freeCompany$ = this.freeCompanyService.getFreeCompanyById(fcId);
      this.companyMembersSubscription = combineLatest([
        this.itemService.getAllMounts(),
        this.itemService.getAllMinions(),
        this.freeCompanyService.getCompanyMembers(fcId)]).subscribe((results) => {
          if (!results[2]) {
            return;
          }
          const players: Player[] = results[2];
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

  getPlayerSearch(playerId: string): PlayerSearch {
    if (this.playerSearch.has(playerId)) {
      return this.playerSearch.get(playerId);
    }
    return new PlayerSearch();
  }

  changedItemQuantity(value: number, playerId: string): void {
    this.playerSearch.get(playerId).itemLength = value;
    this.updateSort();
    this.changeDetector.detectChanges();
  }

  changePackLength(value: number, playerId: string): void {
    this.playerSearch.get(playerId).packLength = value;
    this.updateSort();
    this.changeDetector.detectChanges();
  }

  private initializePlayers(players: Player[]): void {
    const playersToInitialize = 4;
    const currentInitialized = this.playersInitialized;
    this.playersInitialized += playersToInitialize;
    for (let i = currentInitialized; i < Math.min(currentInitialized + playersToInitialize, players.length); i++) {
      players[i].extraInformation$ = this.characterService.getPlayerExtraInformation(players[i].id);
      this.playerSubscriptions.push(players[i].extraInformation$.subscribe((info) => {
          const playerSearch = this.playerSearch.get(players[i].id);
          playerSearch.itemLength = info.mounts.length;
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


  private updateSort(): void {
    this.sortUpdater = !this.sortUpdater;
  }

}

export class PlayerSearch {
  constructor(public packLength: number = 0, public itemLength: number = 0) {
  }

  get emptyPack(): boolean {
    return this.packLength === 0;
  }

  get emptyItems(): boolean {
    return this.itemLength === 0;
  }
}
