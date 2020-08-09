import {PaginationResult, PaginationResultCached} from '../../models/pagination-result';
import {FreeCompany} from '../../models/free-company';
import {CacheModel, LocalStorageSubject} from './local-storage';

export class FreeCompanyPaginatorStorage extends LocalStorageSubject<PaginationResult<FreeCompany>> {
  constructor(key: string, private freeCompanyLocalStorage: LocalStorageSubject<FreeCompany>) {
    super(key);
  }

  tryToGetFromCache(key: string): PaginationResult<FreeCompany> | undefined {
    const cache = CacheModel.fromJson<PaginationResultCached>(localStorage.getItem(this.getKeyForModel(key)));
    if (!cache || !cache.isValid()) {
      return undefined;
    }
    const freeCompanies = cache.model.resultsIds.map(id => this.freeCompanyLocalStorage.tryToGetFromCache(id));
    return freeCompanies.some(fc => fc === undefined) ?
      undefined :
      new PaginationResult<FreeCompany>(cache.model.pagination, freeCompanies);
  }

  set(key: string, model: PaginationResult<FreeCompany>) {
    model.results.forEach(fc => this.freeCompanyLocalStorage.set(fc.id, fc));
    localStorage.setItem(this.getKeyForModel(key),
      JSON.stringify(new CacheModel(FreeCompanyPaginatorStorage.getPaginationResultCache(model))));
  }

  private static getPaginationResultCache(paginationResult: PaginationResult<FreeCompany>): PaginationResultCached {
    return new PaginationResultCached(paginationResult.pagination, paginationResult.results.map(p => p.id));
  }

}
