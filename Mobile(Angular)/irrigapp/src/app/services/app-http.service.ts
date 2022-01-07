import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppHttpService {

  constructor(private http:HttpClient) { }
  LoginUser(username, email, password){
    const loginData={
      username: username,
      email :email,
      password:password
    };
    return this.http.post("https://smartirrigationsystem.me/auth/signin", loginData )
  }


  RegisterUser(username, name ,email, password){
    const RegisterData={
      name:name,
      email :email,
      username :username,
      password:password,
    };
    return this.http.post("https://smartirrigationsystem.me/auth/signup", RegisterData)
  }

}
