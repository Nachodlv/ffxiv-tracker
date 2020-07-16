import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberListComponent } from './member-list/member-list.component';
import { HasMountPipe } from './pipes/has-mount.pipe';
import {FormsModule} from '@angular/forms';
import { PackSelectorComponent } from './member-list/pack-selector/pack-selector.component';
import { SearchPlayersPipe } from './pipes/search-players.pipe';
import { SearchMountsPipe } from './pipes/search-mounts.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MemberListComponent,
    HasMountPipe,
    PackSelectorComponent,
    SearchPlayersPipe,
    SearchMountsPipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        TooltipModule.forRoot(),
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
