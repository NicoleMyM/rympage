import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CharactersListComponent } from './characters-list.component';

const routes: Routes = [{ path: '', component: CharactersListComponent }];
//console.log('routes',routes);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersListRoutingModule { }
