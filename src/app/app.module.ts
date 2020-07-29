import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MemberListComponent} from './member-list/member-list.component';
import {FormsModule} from '@angular/forms';
import {PackSelectorComponent} from './member-list/pack-selector/pack-selector.component';
import {SearchPlayersPipe} from './pipes/search-players.pipe';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ItemIconComponent} from './member-list/item-icon/item-icon.component';
import {ItemListComponent} from './member-list/item-list/item-list.component';
import {PackListComponent} from './member-list/pack-list/pack-list.component';
import {SearchItemsPipe} from './pipes/search-items.pipe';
import {HasItemPipe} from './pipes/has-item.pipe';
import {FcSearcherComponent} from './fc-searcher/fc-searcher.component';
import {AlertModule} from 'ngx-bootstrap/alert';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { FcCardComponent } from './fc-searcher/fc-card/fc-card.component';
import { FcCrestComponent } from './fc-searcher/fc-card/fc-crest/fc-crest.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    HasItemPipe,
    PackSelectorComponent,
    SearchPlayersPipe,
    SearchItemsPipe,
    ItemIconComponent,
    ItemListComponent,
    PackListComponent,
    FcSearcherComponent,
    FcCardComponent,
    FcCrestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    ProgressbarModule.forRoot(),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
