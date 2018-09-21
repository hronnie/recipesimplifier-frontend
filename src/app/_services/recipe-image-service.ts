import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IngredientInfo, RecipeImageAlbum} from "../_models";
import {AppSettings} from "../_commons";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecipeImageService {

  constructor(private http: HttpClient) {}

  getRecipeImages(recipeId): Observable<RecipeImageAlbum> {
    return this.http.get<Array<RecipeImageAlbum>>(AppSettings.RECIPE_IMAGE_ALBUM_URL + recipeId)
      .pipe(
        tap((response: RecipeImageAlbum) => {
          debugger;
          return response;
        })
      );
  }
}
