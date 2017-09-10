import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BusinessProvider } from '../../providers/business/business';

/**
 * Generated class for the InfosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 declare var google;

@IonicPage()
@Component({
  selector: 'page-infos',
  templateUrl: 'infos.html',
})
export class InfosPage {
  @ViewChild('map') mapElement: ElementRef;
    map: any;
    start = 'chicago, il';
    end = 'chicago, il';
    latitude: any;
    longitude: any;
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
  infoestabelecimento: any;
  cardapio: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public business: BusinessProvider) {
    this.latitude = this.business.getLat();
    this.longitude = this.business.getLong();
    this.infoestabelecimento = this.business.getEstabelecimentoAtual();
    this.business.getCardapio(this.infoestabelecimento['_id']).subscribe(data => {
      console.log(data['docs'].length);
      this.cardapio = data['docs'];

    }, err => {
      console.log("ERROR | METHOD: CADASTRAR | POST: LOGINUSER => " + err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfosPage');
    this.initMap();
  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 7,
      center: {lat:   this.latitude, lng: this.longitude}
    });

    this.directionsDisplay.setMap(this.map);
}

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        console.log('RESPONSE API GOOGLE | ', JSON.stringify(response));
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

}
