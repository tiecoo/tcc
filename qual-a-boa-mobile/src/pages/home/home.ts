import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import {
  AngularFireDatabase,
  FirebaseListObservable } from 'angularfire2/database';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  parameter1: string;
  public people: FirebaseListObservable<any>;

  constructor( public af: AngularFireDatabase,public navCtrl: NavController, public auth: AuthProvider, public navParams: NavParams) {

    this.parameter1 = navParams.get('email');

    this.people = this.af.list('https://qualaboa-68e64.firebaseio.com/pessoas', {
      query: {
        orderByChild: 'email',
        equalTo: this.parameter1
      }
    });
    if (this.people[0] == undefined){
      this.people = this.af.list('https://qualaboa-68e64.firebaseio.com/estabelecimentos', {
        query: {
          orderByChild: 'email',
          equalTo: this.parameter1
        }
      });
    }
  }
  signOutClicked() {
    this.auth.signOutUser();
    this.navCtrl.insert(0,LoginPage);
    this.navCtrl.popToRoot();


    // this.navCtrl.push(LoginPage);
  }
//hey
}
