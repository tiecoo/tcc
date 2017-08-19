import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { BusinessProvider } from '../../providers/business/business';
import {AlertController} from 'ionic-angular';
import { HomePage} from '../home/home';
/**
 * Generated class for the LoginpersonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 export class Pessoa{
   id: string;
   email: string;
   password: string;
   pessoa: boolean;
 }
@IonicPage()
@Component({
  selector: 'page-loginperson',
  templateUrl: 'loginperson.html',
})
export class LoginpersonPage {
  pessoa: Pessoa;
  lista: FirebaseListObservable<any>;
  objetoperson: any = [];
  public title = 'Sign up with email'
    public emailSignUpForm: FormGroup;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public business: BusinessProvider, private formBuilder: FormBuilder,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController, public af: AngularFireDatabase, public alertc: AlertController) {
      // building the form
      this.lista = this.af.list('https://qualaboa-68e64.firebaseio.com/pessoas');
      this.pessoa = new Pessoa();
    this.emailSignUpForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      repassword: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginpersonPage');
  }

  createToast(message: string) {
  return this.toastCtrl.create({
    message,
    duration: 3000
  })
}

cadastrar(){
  if (!this.emailSignUpForm.valid) {
    this.createToast('Form not valid').present();
    return
  }
  else {
    // if the form is valid, we continue with validation
    this.objetoperson = {
      'email': this.emailSignUpForm.value.email,
      'password' : this.emailSignUpForm.value.password,
      'repassword': this.emailSignUpForm.value.repassword,
      'pessoa': 1,
      'tipo': 'pessoa'
    }
    this.business.setPerson(this.objetoperson);
    this.business.cadastrarPessoa(this.objetoperson).subscribe(data => {
      console.log(JSON.stringify(data));
      let alert = this.alertCtrl.create({
        title: 'Cadastrado com sucesso!',
        subTitle: 'Seja bem vindo ao Qual é a Boa!',
        buttons: ['OK']
      });

      alert.present();
      this.navCtrl.setRoot(HomePage);
    }, err => {
      console.log("ERROR | METHOD: CADASTRAR | POST: CADASTRARPESSOA => " + err);
      let alert = this.alertCtrl.create({
        title: 'E-mail ja cadastrado!',
        subTitle: 'Caro, esse e-mail ja esta cadastrado na nossa base de dados!',
        buttons: ['OK']
      });
      alert.present();
    });
  }

}
}
