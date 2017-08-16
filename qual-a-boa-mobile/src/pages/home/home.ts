import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import {
  AngularFireDatabase,
  FirebaseListObservable } from 'angularfire2/database';
  import { BusinessProvider } from '../../providers/business/business';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  parameter1: string;
  tipo: string;
  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnds: '1990-02-20'
  }
  public people: FirebaseListObservable<any>;

  constructor( public af: AngularFireDatabase,public navCtrl: NavController, public auth: AuthProvider, public navParams: NavParams, public business: BusinessProvider) {

    this.parameter1 = this.business.getPerson();
    this.tipo = this.business.getType();
    this.people = this.af.list('https://qualaboa-68e64.firebaseio.com/'+this.tipo, {
      query: {
        orderByChild: 'email',
        equalTo: this.parameter1
      }
    });
    // alert(this.parameter1);
    // if (this.people[0] == undefined){

      // this.people = this.af.list('https://qualaboa-68e64.firebaseio.com/estabelecimentos', {
      //   query: {
      //     orderByChild: 'email',
      //     equalTo: this.parameter1
      //   }
      // });
    // }
  }
  signOutClicked() {
    this.auth.signOutUser();
    this.navCtrl.insert(0,LoginPage);
    this.navCtrl.popToRoot();


    // this.navCtrl.push(LoginPage);
  }
//hey
}
