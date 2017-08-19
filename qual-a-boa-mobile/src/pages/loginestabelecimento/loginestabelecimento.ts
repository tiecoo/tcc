import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import {AlertController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { BusinessProvider } from '../../providers/business/business';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginestabelecimentoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 export class Estabelecimento{
   id: string;
   email: string;
   password: string;
   repassword: string;
   pessoa: boolean;
 }
@IonicPage()
@Component({
  selector: 'page-loginestabelecimento',
  templateUrl: 'loginestabelecimento.html',
})
export class LoginestabelecimentoPage {
  lista: FirebaseListObservable<any>;
  objetoestab:any = [];
  estabelecimento: Estabelecimento;
    public emailSignUpForm: FormGroup;
  constructor(public alertCtrl: AlertController,public business: BusinessProvider,public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase, public alertc: AlertController, private formBuilder: FormBuilder,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {

    this.lista = this.af.list('https://qualaboa-68e64.firebaseio.com/estabelecimentos');
    console.log(this.lista);
    this.estabelecimento = new Estabelecimento();
    this.emailSignUpForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      repassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }
  cadastrar(){
    if (!this.emailSignUpForm.valid) {
      this.createToast('Form not valid').present();
      return
    }
    else {
      // if the form is valid, we continue with validation
      this.objetoestab = {
        'email': this.emailSignUpForm.value.email,
        'password' : this.emailSignUpForm.value.password,
        'repassword': this.emailSignUpForm.value.repassword,
        'pessoa': 0,
        'tipo': 'estabelecimento'
      }
      this.business.setPerson(this.objetoestab);
      this.business.cadastrarEstabelecimento(this.objetoestab).subscribe(data => {
        console.log(JSON.stringify(data));
        let alert = this.alertCtrl.create({
          title: 'Cadastrado com sucesso!',
          subTitle: 'Seja bem vindo ao Qual é a Boa!',
          buttons: ['OK']
        });
        alert.present();
        this.navCtrl.setRoot(HomePage);

      }, err => {
        console.log("ERROR | METHOD: CADASTRAR | POST: CADASTRARESTABELECIMENTO => " + err);
        let alert = this.alertCtrl.create({
          title: 'E-mail ja cadastrado!',
          subTitle: 'Caro, esse e-mail ja esta cadastrado na nossa base de dados!',
          buttons: ['OK']
        });
        alert.present();
      });
    }

  }

  editar(iD){

  }

  createToast(message: string) {
  return this.toastCtrl.create({
    message,
    duration: 3000
  })
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginestabelecimentoPage');
  }

}
