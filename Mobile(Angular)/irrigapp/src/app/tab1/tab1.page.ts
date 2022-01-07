import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators, FormsModule , ReactiveFormsModule } from "@angular/forms";
import {AppHttpService} from "../services/app-http.service";



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  username='';
  email='';
  password = '';

  constructor(private router : Router, private authService:AppHttpService) {}
  ngOnInit(): void {
  }

  GoToTab2() {
    this.router.navigate(["/signup"]).then(r => console.log("done!"))
  }

  GoToTab3(){

    this.authService.LoginUser(this.username, this.email , this.password).subscribe(() =>{
      this.router.navigate(["/profile"]).then(r => console.log("done!"))})
  }
}

