import { Component, OnInit } from '@angular/core';
import {FreeCompanyService} from '../services/free-company-service/free-company.service';
import {Observable} from 'rxjs';
import {Player} from '../models/player';
import {tap} from 'rxjs/operators';
import {CharacterService} from '../services/character-service/character.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  players$: Observable<Player[]>;

  constructor(private freeCompanyService: FreeCompanyService, private characterService: CharacterService) { }

  ngOnInit(): void {
    this.players$ = this.freeCompanyService.getCompanyMembers().pipe(tap(players => {
      players.forEach(player => {
        player.mounts = this.characterService.getCharacterMounts(player.id);
      });
    }));

  }

}
