import { Component } from '@angular/core';
import { NavController,AlertController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { LoginPage } from '../login/login';
import { CardapioPage } from '../cardapio/cardapio';
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
  pessoacomp: any;
  todosestabelecimentos: any;
  public event = {
    month: '1990-02-19',
    timeStarts: '07:43',
    timeEnd: '19:43'
  }
  public people: FirebaseListObservable<any>;

  constructor( public alertCtrl: AlertController, public af: AngularFireDatabase,public navCtrl: NavController, public auth: AuthProvider, public navParams: NavParams, public business: BusinessProvider) {

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
  signOutClicked() {
    this.navCtrl.insert(0,LoginPage);
    this.navCtrl.popToRoot();
  // this.navCtrl.push(LoginPage);
  }

  openPage(){
    this.navCtrl.setRoot(CardapioPage);
  }
//hey
}
