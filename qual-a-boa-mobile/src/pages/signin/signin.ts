import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireModule } from "angularfire2";
import { AuthService } from '../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { ToastController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BusinessProvider } from '../../providers/business/business';
import {AlertController} from 'ionic-angular';

import { Nav, Platform } from 'ionic-angular';

/**
 * Generated class for the SigninPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 // autenticacao: FirebaseAuthState;
 // email: string;
 // senha: string;
@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  providers: [AngularFireAuth]
})
export class SigninPage {
  @ViewChild(Nav) nav: NavController;
  email: string;
  password: string;
  type: string;

  public signInForm: FormGroup;
  public title = 'Sign in with email'

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, private formBuilder: FormBuilder,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController, public business: BusinessProvider) {
      this.signInForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])],
      type: ['']
    });
    console.log(this.business.getLastPatente());
  }
  createToast(message: string) {
    return this.toastCtrl.create({
      message,
      duration: 3000
    })
  }
  signInFormSubmit() {
    ;
    console.log("Formulario de signin!");

    this.business.validateUser(this.signInForm.value).subscribe(data => {
      console.log(data['message']);
      if (data['message'] == "Senha correta!"){

        data['info']['tipo'] = this.signInForm.value.type;
        this.business.setPerson(data['info']);
        this.navCtrl.setRoot(HomePage);
      } else if (data['message'] == "Senha incorreta!"){
        let alert = this.alertCtrl.create({
          title: 'Login incorreto!',
          subTitle: 'A senha digitada esta incorreta!',
          buttons: ['OK']
        });
        alert.present();
      } else {
        let alert = this.alertCtrl.create({
          title: 'Cadastrado inexistente!',
          subTitle: 'E-mail e senha incorretos!',
          buttons: ['OK']
        });
        alert.present();
      }

    }, err => {
      console.log("ERROR | METHOD: CADASTRAR | POST: LOGINUSER => " + err);
    });
      // first we check, if the form is valid
      // if (!this.signInForm.valid) {
      //   this.createToast('Ooops, form not valid...').present();
      //   return
      // } else {
      //   this.business.setPerson(this.signInForm.value.email);
      //   this.business.setType(this.signInForm.value.type);
      //   // if the form is valid, we continue with validation
      //   this.auth.signInUser(this.signInForm.value.email, this.signInForm.value.password)
      //     .then(() => {
      //       this.navCtrl.setRoot(HomePage);
      //       // this.navCtrl.push(HomePage);
      //       // this.navCtrl.push(HomePage, {
      //       //     email: this.signInForm.value.email
      //       // });
      //     },
      //     (error: any) => {
      //       switch (error.code) {
      //         case 'auth/invalid-api-key':
      //           this.createToast('Invalid API key, don\'t forget update').present();
      //           break;
      //         default:
      //           this.createToast(error.message).present();
      //           break;
      //       }
      //     })
      // }
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
