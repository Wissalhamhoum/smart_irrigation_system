import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AppHttpService} from "../services/app-http.service";



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  username='';
  name='';
  email='';
  password = '';
  //private form : FormGroup;


  constructor(private router:Router,  private authService:AppHttpService) {
    // this.form = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   name: ['', Validators.required],
    //   email: ['', Validators.required],
    //   password: ['', Validators.required]

    //});
  }
  ngOnInit(): void {
  }

  GoToTab1() {
    this.authService.RegisterUser( this.name,this.email ,this.username, this.password ).subscribe(() =>{
      console.log("I'm")
    this.router.navigate(["/login"]).then(r => console.log("done!"))
  })
}

  GoToTab11() {
    this.router.navigate(["/login"]).then(r => console.log("done!"))
  }
}
