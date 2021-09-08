import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.url.includes("/Account/Login")
            && !request.url.includes("/Account/Register")
            && !request.url.includes("/Account/PasswordRecover")) {

            //recuperar o TOKEN gravado na localstorage
            var accessToken = JSON.parse(localStorage.getItem('AUTHENTICATION') as string).accessToken;

            //enviando o TOKEN para a API..
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + accessToken
                }
            });

        }

        return next.handle(request);
    }
}