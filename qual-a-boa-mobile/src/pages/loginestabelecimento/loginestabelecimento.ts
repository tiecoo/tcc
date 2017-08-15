import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import {AlertController} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

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
   pessoa: boolean;
 }
@IonicPage()
@Component({
  selector: 'page-loginestabelecimento',
  templateUrl: 'loginestabelecimento.html',
})
export class LoginestabelecimentoPage {
  lista: FirebaseListObservable<any>;
  estabelecimento: Estabelecimento;
    public emailSignUpForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFireDatabase, public alertc: AlertController, private formBuilder: FormBuilder,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {

    this.lista = this.af.list('https://qualaboa-68e64.firebaseio.com/estabelecimentos');
    console.log(this.lista);
    this.estabelecimento = new Estabelecimento();
    this.emailSignUpForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });

  }
  cadastrar(){
    if (!this.emailSignUpForm.valid) {
      this.createToast('Form not valid').present();
      return
    }
    else {
      // if the form is valid, we continue with validation
      this.auth.signUpUser(this.emailSignUpForm.value.email, this.emailSignUpForm.value.password)
        .then(() => {
          this.estabelecimento['pessoa'] = false;
          this.estabelecimento['email'] = this.emailSignUpForm.value.email;
          this.estabelecimento['senha'] = this.emailSignUpForm.value.senha;

          this.lista.push(this.estabelecimento).then(() => {

            let alert = this.alertc.create({
              title: 'Cadastrado com sucesso!',
              buttons: ['Continuar']
          });


          alert.present();
            this.estabelecimento = new Estabelecimento();
          });

          // showing succesfull message
          this.createToast('Signed up with email: ' + this.emailSignUpForm.value.email).present()
          // closing dialog
          // this.viewCtrl.dismiss()
        },
        /**
         * Handle Authentication errors
         * Here you can customise error messages like our example.
         * https://firebase.google.com/docs/reference/js/firebase.auth.Error
         *
         * mismatch with error interface: https://github.com/angular/angularfire2/issues/976
         */
        (error) => {
          this.createToast(error.message).present();
        })
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
