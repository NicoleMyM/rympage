import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment/environment';
import { Character } from '../../shared/interfaces/character.interfaces';

import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  [x: string]: any;

  constructor(private http: HttpClient) { }

  /**private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return result as T;
    };
  }**/

  searchCharacter(query = '', page = 1){
    return this.http.get<Character[]>(
      `${environment.baseUrlAPI}/character/?name=${query}&page=${page}`)
  }

  getDetails(id: number) {
    const url = `${environment.baseUrlAPI}/character/${id}`;
    return this.http.get<Character>(url).pipe(
      tap(_ => console.log(`fetched character id=${id}`))
      /**catchError(this.handleError<Character>(`getDetails id=${id}`));**/
      )
    
      //console.log('params',this.route.snapshot.queryParams['q']);

    /**this.query = this.route.snapshot.queryParams['q']
    this.getDataFromServices();

    this.route.queryParams.pipe(take(1))
    .subscribe((params:ParamMap) => {
      this.query = this.route.snapshot.queryParams['q']
      this.getDataFromServices();
    });**/
  }
}
