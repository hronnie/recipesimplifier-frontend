import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AppSettings} from "../_commons";
import {IngredientInfo} from "../_models";

@Injectable()
export class IngredientInfoService {

  constructor(private http: HttpClient) {}

  findAll(): Observable<IngredientInfo> {
    return this.http.get<IngredientInfo>(AppSettings.RECIPE_BASE_DOMAIN + '/api/admin/ingredientinfo/')
      .pipe(
        tap((response: IngredientInfo) => {
          return response;
        })
      );
  }
}
