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

  public signInForm: FormGroup;
  public title = 'Sign in with email'

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
    public auth: AuthProvider,
    public toastCtrl: ToastController,
    public viewCtrl: ViewController) {
      this.signInForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }
  createToast(message: string) {
    return this.toastCtrl.create({
      message,
      duration: 3000
    })
  }
  signInFormSubmit() {

      // first we check, if the form is valid
      if (!this.signInForm.valid) {
        this.createToast('Ooops, form not valid...').present();
        return
      } else {

        // if the form is valid, we continue with validation
        this.auth.signInUser(this.signInForm.value.email, this.signInForm.value.password)
          .then(() => {
            // this.nav.setRoot(HomePage);
            // this.navCtrl.push(HomePage);
            this.navCtrl.push(HomePage, {
                email: this.signInForm.value.email
            });
          },
          (error: any) => {
            switch (error.code) {
              case 'auth/invalid-api-key':
                this.createToast('Invalid API key, don\'t forget update').present();
                break;
              default:
                this.createToast(error.message).present();
                break;
            }
          })
      }
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}