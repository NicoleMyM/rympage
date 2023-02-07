import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersListRoutingModule } from './characters-list-routing.module';
import { CharactersDetailComponent } from '../character-detail/characters-detail.component';

const myComponentsDetail = [CharactersDetailComponent];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CharactersListRoutingModule
  ]
})
export class CharactersListModule { }
