import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';

@Injectable()
export class BusinessProvider {
  person: any;
  type: any;
  constructor(public afAuth: AngularFireAuth) { }

  public setPerson(pessoa){
    this.person = pessoa;
  }

  public getPerson(){
    return this.person;
  }

  public setType(tipo){
    this.type = tipo;
  }

  public getType(){
    return this.type;
  }
}
