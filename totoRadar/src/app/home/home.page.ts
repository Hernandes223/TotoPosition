import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DataService } from '../data.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  center: any = '0,0';
  constructor(
    private geolocation: Geolocation,
    public dados: DataService
    ) {}

  ngOnInit() {
    this.localization();
  }

  localization(){
    this.geolocation.getCurrentPosition().then((resp) => {
       resp.coords.latitude
       resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
     const subscription = this.geolocation.watchPosition()
                              .pipe(filter((p) => p.coords !== undefined)) //Filter Out Errors
                              .subscribe(position => {
  console.log(position.coords.longitude + ' ' + position.coords.latitude);

        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
        this.dados.local(data).then((resp) => {
         if (resp) {
           console.log('dados enviados')
         }
       }).catch((error) => {
         console.log('Error no evio da localizacao', error);
       });
     });



     
  }


}
