import {Component, OnInit} from '@angular/core';
import {AppHttpService} from "./services/app-http.service";
import {error} from "protractor";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private service:AppHttpService) {}
   ngOnInit() {
  //   this.getDataFromApi()
   }
  // getDataFromApi(){
  //   this.service.get().subscribe((response)=>{
  //     console.log("Response from API is", response)
  //   },(error) =>{ console.log("error is ", error)})
  // }
}
