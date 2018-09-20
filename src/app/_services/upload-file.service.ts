import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AppSettings} from "../_commons";
import {tap} from "rxjs/operators";
import {Recipe, UploadFileResponse} from "../_models";

@Injectable({
  providedIn: 'root'
})

export class UploadFileService {

  constructor(private http: HttpClient) { }

  pushFileToStorage(file: File, index: number, recipeId: number): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', AppSettings.RECIPE_IMAGE_MANAGEMENT_URL + '/' + index + '/' + recipeId, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req)
      .pipe(
        tap((response: UploadFileResponse) => {
          return response;
        })
      );;
  }

  getFiles(): Observable<any> {
    return this.http.get('http://localhost:8080/api/recipeimage/all');
  }
}
