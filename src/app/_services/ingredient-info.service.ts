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
    return this.http.get<IngredientInfo>(AppSettings.INGREDIENT_INFO_URL)
      .pipe(
        tap((response: IngredientInfo) => {
          return response;
        })
      );
  }

  create(inputDto: IngredientInfo): Observable<IngredientInfo> {
    return this.http.post<IngredientInfo>(AppSettings.INGREDIENT_INFO_URL,
      inputDto)
      .pipe(
        tap((response: IngredientInfo) => {
          return response;
        })
      );
  }

  update(inputDto: IngredientInfo): Observable<IngredientInfo> {
    return this.http.put<IngredientInfo>(AppSettings.INGREDIENT_INFO_URL,
      inputDto)
      .pipe(
        tap((response: IngredientInfo) => {
          return response;
        })
      );
  }

  delete(ingrInfoId: number): Observable<IngredientInfo> {
    return this.http.delete<IngredientInfo>(AppSettings.RECIPE_BASE_DOMAIN + ingrInfoId)
      .pipe(
        tap((response: IngredientInfo) => {
          return response;
        })
      );
  }
}
