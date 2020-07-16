import {Component, OnInit} from '@angular/core';
import {FreeCompanyService} from '../services/free-company-service/free-company.service';
import {forkJoin, Observable} from 'rxjs';
import {Player} from '../models/player';
import {tap} from 'rxjs/operators';
import {CharacterService} from '../services/character-service/character.service';
import {MountPack, Packs} from '../models/mount-pack';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  players$: Observable<Player[]>;
  packSelected: MountPack | undefined;
  searchInput = '';

  constructor(private freeCompanyService: FreeCompanyService,
              private characterService: CharacterService) {
  }

  ngOnInit(): void {
    this.freeCompanyService.getCompanyMembers();
    this.players$ = this.freeCompanyService.members$.pipe(tap(players => {
      players.forEach(player => {
        this.characterService.fetchCharacterMounts(player.id);
        player.mounts = this.characterService.getPlayerMount(player.id);
      });
    }));
  }

}
