import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {TooltipModule} from 'ngx-bootstrap/tooltip';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MemberListComponent} from './member-list/member-list.component';
import {HasMountPipe} from './pipes/has-mount.pipe';
import {FormsModule} from '@angular/forms';
import {PackSelectorComponent} from './member-list/pack-selector/pack-selector.component';
import {SearchPlayersPipe} from './pipes/search-players.pipe';
import {SearchMountsPipe} from './pipes/search-mounts.pipe';
import {ProgressbarModule} from 'ngx-bootstrap/progressbar';
import {NgxSpinnerModule} from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ItemIconComponent } from './member-list/item-icon/item-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    HasMountPipe,
    PackSelectorComponent,
    SearchPlayersPipe,
    SearchMountsPipe,
    ItemIconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TooltipModule.forRoot(),
    ProgressbarModule.forRoot(),
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
