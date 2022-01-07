import { Component, ViewChild, ElementRef } from '@angular/core';

import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { IonSlides, Platform } from '@ionic/angular';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage {
  @ViewChild('map', { static: false }) mapContainer: ElementRef;
  @ViewChild('slides', { static: false }) slider: IonSlides;

  map: any;
  marker: L.Marker;
  CurrentMarker: L.Marker;
  segment = 0;
  searchKey: string;
  places = [];
  isMarkerSet: boolean = false;

  addressComponent: any;
  constructor(public http: HttpClient, private geolocation: Geolocation, private platform: Platform) { }
  ionViewWillEnter() {
    console.log(this.marker)
    this.loadMap();
  }

  search() {
    if (this.searchKey === '') {
      this.places = [];
    } else if (this.searchKey.length > 2) {
      let url = 'https://nominatim.openstreetmap.org/search?format=json&q=' + this.searchKey;
      this.http.get(url).subscribe((data: any) => {
        console.log(data);
        this.places = data;
      })
    }

  }
  onClickPickAddress(lat, lng) {
    this.places = [];
    console.log('places done!')

    this.setMarkertWithAnimation(lat,lng, false);
  }
  loadMap() {
    this.map = L.map('map').fitWorld();
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'contributor',
      maxZoom: 30
    }).addTo(this.map);
    // For Web
    this.map.locate({
      setView: true,
      maxZoom: 10
    }).on('locationfound', (e) => {
      console.log(e);
      if(!this.platform.is('cordova')){
        console.log('Platform is Web')
        this.setMarkertWithAnimation(e.latitude, e.longitude, true);
      }
    })
    if(this.platform.is('cordova')){
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log('Platform is android/ios')
        this.setMarkertWithAnimation(resp.coords.latitude, resp.coords.longitude, true)
      }).catch((error) => {
        console.log('Error getting location', error);
      });
    }

    // Adding Map Click Event
    this.map.on('click', (e) => {
      console.log('Map Clicked')
      this.setMarkertWithAnimation(e.latlng.lat, e.latlng.lng, false);
    })
  }


  setMarkertWithAnimation(lat, lng, force: boolean) {
    var myIconchanged = L.icon({
      iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII='
    })


    var currentLocal = L.icon({
      iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAkCAYAAAB8DZEQAAAAAXNSR0IArs4c6QAAA0NJREFUSEutllmoj1EUxX/XHCIPlKkUJTwQScoL1wuuG6FuUTKXMhUPigwZCg+GlBB5ICWUeYiiSIlEIlNmSWSep9bXObfd9k3/suvW/Z+99l7fOWeftXcV+VYFDA+QDUBXA38DTAT+AMeB31mplCTLWgI3gC4FHyL3I2AGcDINm0bSBNgCTCqR3EN2AssCab3Pk7QGLgC9Ugg+h6OJroZAsxTcxxD/OPosSVPgItDXBWptK7AX+GZ8nYFqYA3Q1sWIqA9wX+uWRImmGfAXYA6wrcSxKU7x1hQ33ZLomN4axDtgRDi6EhwJZBhwzIGnADu0E/09BToYwFxAJVupaefrTdBLVacI9AVHzdEtAlZWmt3gvwONw2+9oRqRjAQOhcUfwFDgfArJAWC0WT8F7AL2OKzNJ1edSHSO2o3sOdDRBalUTwRyz30P6Ae8N472wE2gTVwTibYULY1EQbqzBhlH2Al45nz6XX/HZUgE9klsTt2B3pi1/06iB3m2iESX3SjnTloBV50Cx5xSXh3XiyKSUcDBAHoVkn1wQVJk+axWiUAVN85h/ZPY70tY+FrgcMolR63SHemRqZ/Ej7PwmcBms1ArkhbAA6CdcUjudYyVmpqayjqaclRHgdwHjDXOTcDsChl0r2paQ0xc8iSsCl8DehvAPGBjXls1WL0lNTkrR+qWSVe1JLNCUruBT4AuvcjUFnwDWw4s8ST6LcfilIyqoqQBAeqQzcP/3UOh+JAVNk9aj9d9jLfaU7QN4/8K7Aam2pisaaVbaMW+rebxqaTV6C55UN5IJGwdMAHo70rc5jmj7pci+fWYIpII1OOsSdmGVKAH8Dpvi2VJdNGqNG8il0LkWlkSJVkaS9JkLBVfChSSDgDOmd6hh6rBodAqIVGyu4Aq72doxyIttCISCd6qIC2TQ++4E/qHfNqNerkmnNtZbJ5EiqyBLM5c64AFLvhyGKqPmHWphNRCNh/YDmhATMyTqIKiZGQp8UJgdcpX2wlSWhbz/EPSE7gOaAySSZlPm4S/wtFpcokYuQcBAw1uTOiaqTvRotT0FqBOaBMVXbA+4AkwGHhowVkXr3U1HxHqRa/NYZCcXwEkjppa7ByXhP0FrQ+k/wKmGQ4AAAAASUVORK5CYII='
    })
    if(!force) {
      if(this.marker !== undefined) {
        console.log('The marker appeared')
        console.log( this.marker)
        this.marker.remove();
        this.marker = L.marker([lat, lng],{icon: myIconchanged}).on('click', () => {

          this.marker.bindPopup('Chosen Location is Latitude:'+lat+' Longitude:'+lng, {
            closeButton: true
          });


        });
        this.map.addLayer(this.marker);
        console.log( this.marker)
        this.map.setView({lat, lng}, this.map.getZoom() ,{
          "animate": true,
          "pan": {
            "duration": 4
          }
        })
        this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`).subscribe((data: any) => {
          console.log('Data address',data)
          this.addressComponent = data.address
          this.searchKey = data.display_name;
        })

      }
    } else {
      this.CurrentMarker = L.marker([lat, lng],{icon: currentLocal }).on('click', () => {
        console.log('marker clicked');
        this.CurrentMarker.bindPopup('My Current Location is Latitude:/n'+lat+' Longitude:'+lng + 'Humidity: temperature:', {
          closeButton: true
        });

      });
      this.marker = L.marker([lat, lng],{icon: myIconchanged }) ;
      this.map.addLayer(this.CurrentMarker);
      this.map.addLayer(this.marker);
      this.map.setView({lat, lng}, this.map.getZoom() ,{
        "animate": true,
        "pan": {
          "duration": 4
        }
      })
      this.http.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`).subscribe((data: any) => {
        console.log('Address Data',data)
        this.addressComponent = data.address
        this.searchKey = data.display_name;
      })
    }
    setTimeout(() =>
    { this.map.invalidateSize()}, 300 );

  }

  slideChanged() {

  }
}

