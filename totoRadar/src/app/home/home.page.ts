import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dado: [];

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
     
     var watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
       data.coords.latitude
       data.coords.longitude

       console.log(data);
       var dados = data;
       this.dados.local(dados).then((resp) => {
        if (resp) {
          console.log('dados enviados')
        }
      }).catch((error) => {
        console.log('Error no evio da localizacao', error);
      });
     });


     
  }


}
