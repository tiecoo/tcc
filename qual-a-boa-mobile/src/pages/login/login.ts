import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginestabelecimentoPage } from '../loginestabelecimento/loginestabelecimento';
import { LoginpersonPage } from '../loginperson/loginperson';
import { SigninPage } from '../signin/signin';

/*
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',

})
export class LoginPage {

  tab1Root: any = LoginestabelecimentoPage;
  tab2Root: any = LoginpersonPage;
  tab3Root: any = SigninPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
}

}
