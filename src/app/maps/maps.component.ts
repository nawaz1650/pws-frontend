import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent  {
  title: string = 'AGM project';

  latitude: number;

  longitude: number;

  zoom: number;

  address: string;

  private geoCoder;

  

  @ViewChild('search')

  public searchElementRef: ElementRef;

  

  constructor(

    private mapsAPILoader: MapsAPILoader,

    private ngZone: NgZone

  ) { }

  

  ngOnInit() {

    this.mapsAPILoader.load().then(() => {

      this.setCurrentLocation();

      this.geoCoder = new google.maps.Geocoder;

    });

  }

  

  private setCurrentLocation() {

    if ('geolocation' in navigator) {

      navigator.geolocation.getCurrentPosition((position) => {

        this.latitude = position.coords.latitude;

        this.longitude = position.coords.longitude;

        this.zoom = 8;

        this.getAddress(this.latitude, this.longitude);

      });

    }

  }

  

  getAddress(latitude, longitude) {

    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {

        if (results[0]) {

          this.zoom = 12;

          this.address = results[0].formatted_address;

        } else {

          window.alert('No results found');

        }

      } else {

        window.alert('Geocoder failed due to: ' + status);

      }

    

    });

  }
  

}
