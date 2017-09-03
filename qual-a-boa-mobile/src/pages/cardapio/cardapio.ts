import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { BusinessProvider } from '../../providers/business/business';

/**
 * Generated class for the CardapioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cardapio',
  templateUrl: 'cardapio.html',
})
export class CardapioPage {
  nomeitem: any;
  precoitem: any;
  descitem: any;
  itenscardapio: any;
  parameter1: any;
  itemcompleto: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public business: BusinessProvider) {
    this.parameter1 = this.business.getPerson();
    this.business.getCardapio(this.parameter1['_id']).subscribe(data => {
      console.log(data['docs'].length);
      this.itenscardapio = data['docs'];

    }, err => {
      console.log("ERROR | METHOD: CADASTRAR | POST: LOGINUSER => " + err);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardapioPage');
  }
  additem(){
    this.itemcompleto = {
      'nomeitem': this.nomeitem,
      'precoitem': this.precoitem,
      'descitem': this.descitem,
      'idEstabelecimento': this.parameter1['_id']
    }
    console.log("ERROR | METHOD: CARDAPIO | POST: ITEMCARDAPIO => " + JSON.stringify(this.itemcompleto));
    this.business.addCardapio(this.itemcompleto).subscribe(data =>{
      this.itenscardapio.push(this.itemcompleto);
      this.nomeitem = '';
      this.precoitem = '';
      this.descitem = '';
    });
  }

}
