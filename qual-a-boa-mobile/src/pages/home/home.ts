import { Component, NgZone } from '@angular/core';
import { NavController,AlertController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { CardapioPage } from '../cardapio/cardapio';
import { InfosPage } from '../infos/infos';
import { Platform } from 'ionic-angular';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

import {
  AngularFireDatabase,
  FirebaseListObservable } from 'angularfire2/database';
  import { BusinessProvider } from '../../providers/business/business';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public watch: any;
public lat: number = 0;
public lng: number = 0;
  parameter1: string;
  tipo: string;
  pessoacomp: any;
  todosestabelecimentos: any;
  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnd: '19:43'
  }
  public people: FirebaseListObservable<any>;

  constructor(public zone: NgZone, public backgroundGeolocation :  BackgroundGeolocation, private geolocation: Geolocation, private platform: Platform, public alertCtrl: AlertController, public af: AngularFireDatabase,public navCtrl: NavController, public auth: AuthProvider, public navParams: NavParams, public business: BusinessProvider) {
    this.startTracking();

    this.parameter1 = this.business.getPerson();
    console.log("OBJETO DO GET ===>".concat(JSON.stringify(this.parameter1)));
    this.business.getEstabelecimentos().subscribe(estabelecimentos => {
      this.todosestabelecimentos = estabelecimentos['docs'];
      console.log(estabelecimentos['docs']);
      });
  }

  public completarcadastro(){
    if(this.parameter1['tipo'] == 'estabelecimento'){
      this.parameter1['open'] = this.event.timeStarts;
      this.parameter1['close'] = this.event.timeEnd;
    }
    this.parameter1['completo'] = 1;
    console.log("CADASTRO COMPLETO ===>".concat(JSON.stringify(this.parameter1)));
    this.business.updateUser(this.parameter1).subscribe(data => {
      console.log(data['message']);
      if(this.parameter1['tipo'] == 'estabelecimento'){
        let alert = this.alertCtrl.create({
          title: 'Cadastro completo!',
          subTitle: 'Muito obrigado por completar o cadastro, que tal agora adicionar alguns itens ao cardápio do seu estabelecimento?',
          buttons: ['OK']
        });
        alert.present();
      }

    }, err => {
      console.log("ERROR | METHOD: CADASTRAR | POST: LOGINUSER => " + err);
    });

  }

  public maisinfo(estabelecimentoq){
    this.business.setEstabelecimentoAtual(estabelecimentoq);
    this.navCtrl.setRoot(InfosPage);
  }
  signOutClicked() {
    this.navCtrl.insert(0,LoginPage);
    this.navCtrl.popToRoot();
  // this.navCtrl.push(LoginPage);
  }

  openPage(){
    this.navCtrl.setRoot(CardapioPage);
  }

  startTracking() {

      // Background Tracking

      let config = {
        desiredAccuracy: 0,
        stationaryRadius: 20,
        distanceFilter: 10,
        debug: true,
        interval: 2000
      };

      this.backgroundGeolocation.configure(config).subscribe((location) => {
        this.business.setLocation( location.latitude,  location.longitude);
        console.log('BackgroundGeolocation:  ' + location.latitude + ',' +  location.longitude);
        // Run update inside of Angular's zone
        this.zone.run(() => {
          this.lat = location.latitude;
          this.lng = location.longitude;
        });
      }, (err) => {
        console.log(err);
      });
      // Turn ON the background-geolocation system.
      this.backgroundGeolocation.start();
      // Foreground Tracking
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };
    }
//hey
}
