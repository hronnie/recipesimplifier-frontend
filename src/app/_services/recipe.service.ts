import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Recipe} from "../_models";

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) {}

  search(filter: {name: string} = {name: ''}, page = 1): Observable<Recipe> {
    return this.http.get<Recipe>('/api/admin/recipe/byname/' + name)
      .pipe(
        tap((response: Recipe) => {
         // TODO: implement response processing
          return response;
        })
      );
  }
}
