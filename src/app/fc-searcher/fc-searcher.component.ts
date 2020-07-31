import {Component, OnInit} from '@angular/core';
import {FreeCompanyService} from '../services/free-company-service/free-company.service';
import {PageChangedEvent} from 'ngx-bootstrap/pagination';
import {PaginationResult} from '../models/pagination-result';
import {Observable} from 'rxjs';
import {FreeCompany} from '../models/free-company';
import {NgxSpinnerService} from 'ngx-spinner';
import {tap} from 'rxjs/operators';

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
  loading = false;

  private searchSubmit = this.searchInput;

  constructor(private freeCompanyService: FreeCompanyService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.spinner.show();
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
    this.loading = true;
    this.paginationResult$ =
      this.freeCompanyService.searchFreeCompanyByName(this.searchInput, this.currentPage).pipe(tap(fc => {
        this.loading = false;
      }, error => this.formError = error));
  }

}
