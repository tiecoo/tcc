import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { LoginestabelecimentoPage } from '../pages/loginestabelecimento/loginestabelecimento';
import { LoginpersonPage } from '../pages/loginperson/loginperson';
import { SigninPage } from '../pages/signin/signin';
import { CardapioPage } from '../pages/cardapio/cardapio';

import { HttpModule } from '@angular/http';

import { AuthService } from '../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AuthProvider } from '../providers/auth/auth';
import { BusinessProvider } from '../providers/business/business';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { AuthProvider } from '../providers/auth/auth';
// import { AuthService } from '../providers/auth-service/auth-service';

export const firebaseConfig = {
  apiKey: "AIzaSyAABt0w18uKLNH9Oyo9o9ONG7X-Dq59Ej4",
    authDomain: "qualaboa-68e64.firebaseapp.com",
    databaseURL: "https://qualaboa-68e64.firebaseio.com",
    projectId: "qualaboa-68e64",
    storageBucket: "qualaboa-68e64.appspot.com",
    messagingSenderId: "973493219172"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    LoginestabelecimentoPage,
    LoginpersonPage,
    SigninPage,
    CardapioPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    LoginestabelecimentoPage,
    LoginpersonPage,
    SigninPage,
    CardapioPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AuthProvider,
    BusinessProvider
    // AuthService
  ]
})
export class AppModule {}
