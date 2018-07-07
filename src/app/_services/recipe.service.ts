import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Recipe} from "../_models";
import {AppSettings} from "../_commons";

@Injectable()
export class RecipeService {

  constructor(private http: HttpClient) {}

  search(filter: {name: string}, page = 1): Observable<Recipe> {
    debugger;
    return this.http.get<Recipe>(AppSettings.RECIPE_BASE_DOMAIN + '/api/admin/recipe/byname/' + filter.name)
      .pipe(
        tap((response: Recipe) => {

          debugger;
         // TODO: implement response processing
          return response;
        })
      );
  }
}
