import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FcSearcherComponent} from './fc-searcher/fc-searcher.component';
import {MemberListComponent} from './member-list/member-list.component';


const routes: Routes = [
  {path: '', component: FcSearcherComponent},
  {path: 'fc/:id', component: MemberListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
