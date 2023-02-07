import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap, NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter, take } from 'rxjs/operators';

import { Character } from 'src/app/shared/interfaces/character.interfaces';
import { CharacterService } from 'src/app/shared/services/character.service';


type RequestInfo = {
  next: string;
};

@Component({
  selector: 'app-characters-list',
  templateUrl: './characters-list.component.html',
  styleUrls: ['./characters-list.component.css']
})
export class CharactersListComponent implements OnInit {
  characters: Character[] = [];
  info: RequestInfo = {
    next: '',
  };
  showGoUpButton = false;
  private pageNum=1;
  private query:string = '';
  private hideScrollHeight = 0;
  private showScrollHeight = 0;

  constructor(
    @Inject(DOCUMENT) private document:Document, 
    private characterSvc: CharacterService, 
    private route:ActivatedRoute, 
    private router:Router) { 
    this.onUrlChanged();
  }

  ngOnInit() {
    this.getCharactersByQuery();
  }

  @HostListener('window:scroll', [])
  onWindowScroll():void{
    const yOffSet = window.pageYOffset;
    if((yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) > this.showScrollHeight ){
      this.showGoUpButton = true;
    }else if(this.showGoUpButton && (yOffSet || this.document.documentElement.scrollTop || this.document.body.scrollTop) < this.hideScrollHeight ){
      this.showGoUpButton = false;
    }
    
  }

  onScrollDown():void{
    if(this.info.next){
      this.pageNum++;
      this.getDataFromServices();
    }
  }

  onScrollTop():void{
    this.document.body.scrollTop = 0;
    this.document.documentElement.scrollTop = 0;
  }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.characters = [];
        this.pageNum = 1;
        this.getCharactersByQuery();
      });
  }

  private getCharactersByQuery(): void{
    this.route.queryParams.pipe(take(1))
    .subscribe((params:any) => {
      this.query = params['q'];
      this.getDataFromServices();
    });
  }

  private getDataFromServices():void{
    this.characterSvc.searchCharacter(this.query, this.pageNum)
    .pipe(take(1))
    .subscribe((res: any) => {
      
      if(res.results.length){
        const {info, results} = res;
        this.characters = [...this.characters, ...results];
        this.info = info;
        //console.log(res.results);
      }else{
        this.characters = [];
      }  
    });
  }
}
