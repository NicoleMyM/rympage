import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path:'',
  redirectTo:'home',
  pathMatch:'full'
},
{ 
  path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) 
}, 
{ 
  path: 'characters-list', loadChildren: () => 
  import('src/app/components/pages/characters/character-list/characters-list.module')
  .then(m => m.CharactersListModule) 
},
{ 
  path: 'characters-detail/:id', loadChildren: () => 
  import('src/app/components/pages/characters/character-detail/characters-detail.module')
  .then(m => m.CharactersDetailModule) 
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
