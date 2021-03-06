import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {logger} from "codelyzer/util/logger";
import {AuthenticationService} from "../_services";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (request.url.endsWith('/auth/login') && request.method === 'POST') {
            return next.handle(request);
        }
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        request = request.clone({
        setHeaders: {
            Authorization: `Bearer ${currentUser.access_token}`,

        }
        });
        if (currentUser && currentUser.access_token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.access_token}`
                }
            });
        }
        return next.handle(request);
    }
}
