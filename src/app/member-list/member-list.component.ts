import {Component, OnInit} from '@angular/core';
import {FreeCompanyService} from '../services/free-company-service/free-company.service';
import {forkJoin, Observable} from 'rxjs';
import {Player} from '../models/player';
import {tap} from 'rxjs/operators';
import {CharacterService} from '../services/character-service/character.service';
import {MountPack, Packs} from '../models/mount-pack';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  players$: Observable<Player[]>;
  packSelected: MountPack | undefined;
  searchInput = '';
  packs: MountPack[] = [];
  totalPlayers = 0;
  playersLoaded = 0;

  private playersInitialized = 0;

  constructor(private freeCompanyService: FreeCompanyService,
              private characterService: CharacterService,
              private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.packs = Packs;
    this.spinner.show();
    this.freeCompanyService.getCompanyMembers();
    this.players$ = this.freeCompanyService.members$.pipe(tap((players: Player[]) => {
        this.totalPlayers = players.length;
        this.initializePlayers(players);
      }
    ));
  }

  private initializePlayers(players: Player[]): void {
    const playersToInitialize = 4;
    for (let i = this.playersInitialized; i < this.playersInitialized + playersToInitialize && i < players.length; i++) {
      players[i].mounts = this.characterService.getPlayerMount(players[i].id).pipe(tap(mounts => {
        this.playersLoaded++;
        this.initializePlayers(players);
      }));
    }
    this.playersInitialized += playersToInitialize;
  }

}
