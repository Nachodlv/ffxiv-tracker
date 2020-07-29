import {Component, OnInit} from '@angular/core';
import {FreeCompanyService} from '../services/free-company-service/free-company.service';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {PaginationResult} from '../models/pagination-result';
import {Observable} from 'rxjs';
import {FreeCompany} from '../models/free-company';

@Component({
  selector: 'app-fc-searcher',
  templateUrl: './fc-searcher.component.html',
  styleUrls: ['./fc-searcher.component.scss']
})
export class FcSearcherComponent implements OnInit {

  searchInput = '';
  formError = '';
  currentPage = 1;
  paginationResult$: Observable<PaginationResult<FreeCompany>> | undefined;

  searchSubmit = this.searchInput;

  constructor(private freeCompanyService: FreeCompanyService) {
  }

  ngOnInit(): void {
  }

  search(): void {
    if (this.searchInput.length <= 3) {
      this.formError = 'Please write at least four letters';
      return;
    }
    this.searchSubmit = this.searchInput;
    this.formError = '';
    this.currentPage = 1;
    this.requestPage();
  }

  pageChanged(pageChanged: PageChangedEvent): void {
    if (this.currentPage === pageChanged.page) {
      return;
    }
    this.currentPage = pageChanged.page;
    this.requestPage();
  }

  private requestPage(): void {
    this.paginationResult$ = this.freeCompanyService.searchFreeCompanyByName(this.searchInput, this.currentPage);
  }

}
