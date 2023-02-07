import { Component, OnInit, Inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { DOCUMENT } from '@angular/common';
import { take, tap} from 'rxjs/operators';
import { CharacterService } from 'src/app/shared/services/character.service';

@Component({
  selector: 'app-characters-detail',
  templateUrl: './characters-detail.component.html',
  styleUrls: ['./characters-detail.component.css']
})

export class CharactersDetailComponent implements OnInit {
  characterId: number;
  //character$: Observable<Character>;
  @Input() character: any;

  constructor(
    //@Inject(DOCUMENT) private document:Document, 
    private route: ActivatedRoute, private dataSvc: CharacterService) { 
    this.characterId = +this.route.snapshot.params['id']; 
  }

  ngOnInit() {
    this.getCharacterFromServices(this.characterId);
  }
  
  private getCharacterFromServices(id: number):void{
    this.dataSvc.getDetails(id).pipe(take(1)).subscribe((res: any) => {
      if(res){
        this.character = res;
        //console.log(res);
      }else{
        this.character = "";
      }  
    });
  }
}
