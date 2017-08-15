import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginpersonPage } from './loginperson';

@NgModule({
  declarations: [
    LoginpersonPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginpersonPage),
  ],
})
export class LoginpersonPageModule {}
