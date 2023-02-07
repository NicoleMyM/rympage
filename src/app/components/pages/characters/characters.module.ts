import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CharactersListComponent } from './character-list/characters-list.component';


const myComponents = [CharactersListComponent];

@NgModule({
  declarations: [...myComponents],
  imports: [CommonModule, RouterModule, InfiniteScrollModule],
  exports: [...myComponents],
})
export class CharactersModule { }
