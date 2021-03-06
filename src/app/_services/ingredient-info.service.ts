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
    return this.http.get<Array<IngredientInfo>>(AppSettings.INGREDIENT_INFO_URL)
      .pipe(
        tap((response: IngredientInfo) => {
          return response;
        })
      );
  }

  create(inputDto: IngredientInfo): Observable<String> {
    return this.http.post<IngredientInfo>(AppSettings.INGREDIENT_INFO_URL,
      inputDto)
      .pipe(
        tap((response: String) => {
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

  delete(inputDto: IngredientInfo): Observable<String> {
    let url = AppSettings.INGREDIENT_INFO_URL + inputDto.ingredientInfoId;
    return this.http.delete<String>(url)
      .pipe(
        tap((response: String) => {
          return response;
        })
      );
  }
}
