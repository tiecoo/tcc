import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import {AlertController} from 'ionic-angular';

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
  public title = 'Sign up with email'
    public emailSignUpForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController, public af: AngularFireDatabase, public alertc: AlertController) {
      // building the form
      this.lista = this.af.list('https://qualaboa-68e64.firebaseio.com/pessoas');
      this.pessoa = new Pessoa();
    this.emailSignUpForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
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

emailSignUpFormSubmit() {
    // first we check, if the form is valid
    if (!this.emailSignUpForm.valid) {
      this.createToast('Form not valid').present();
      return
    } else {
      this.pessoa['pessoa'] = true;
      this.pessoa['email'] = this.emailSignUpForm.value.email;
      // if the form is valid, we continue with validation
      this.auth.signUpUser(this.emailSignUpForm.value.email, this.emailSignUpForm.value.password)
        .then(() => {
          this.lista.push(this.pessoa).then(() => {
              this.pessoa = new Pessoa();
              let alert = this.alertc.create({
                title: 'Cadastrado com sucesso!',
                buttons: ['Continuar']
            });

            // showing succesfull message
            this.createToast('Cadastradado pelo: ' + this.emailSignUpForm.value.email).present()
            // closing dialog
            // this.viewCtrl.dismiss()
          }),
        (error) => {
          this.createToast(error.message).present();
        }
      });
    }
  }
}
