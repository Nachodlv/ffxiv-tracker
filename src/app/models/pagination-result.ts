import {Model} from './model';

export class PaginationResult<T extends Model> {
  constructor(public pagination: Pagination, public results: T[] = []) {
  }

  static fromJson<T extends Model>(json: any, model: T): PaginationResult<T> {
    return new PaginationResult<T>(Pagination.fromJson(json.Pagination), json.Results.map(result => model.fromJson(result)));
  }
}

export class PaginationResultCached {
  constructor(public pagination: Pagination, public resultsIds: string[]) {
  }
}

class Pagination {
  constructor(
    public page: number,
    public pageNext: number,
    public pagePrev: number,
    public pageTotal: number,
    public results: number,
    public resultsPerPage: number,
    public resultsTotal: number
  ) {
  }

  static fromJson(json: any): Pagination {
    return new Pagination(json.Page, json.PageNext, json.PagePrev, json.PageTotal, json.Results, json.ResultsPerPage, json.ResultsTotal);
  }
}
