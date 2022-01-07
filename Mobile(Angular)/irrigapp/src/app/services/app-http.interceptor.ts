import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppHttpService} from "./app-http.service";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor{
  constructor(private router: Router, private authService: AppHttpService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("fadit")
      return next.handle(req);
    }
  }



