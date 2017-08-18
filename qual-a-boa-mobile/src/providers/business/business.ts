import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class BusinessProvider {
  person: any;
  type: any;
  // public api= "http://192.168.0.110:3000";
  // 172.18.0.82
public api= "http://172.18.0.82:3000";
  constructor(private http: Http) { }


  getLastPatente() {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAA');
    //  return this.http.get('http://192.168.0.110:3000/todos')
    //  .map((response: Response) => {
    //    console.log("response");
    //    return response.json();
    //  });
     this.http.get(`${this.api}/todos`).map(res => res.json()).subscribe(docs => {
        console.log( 'docs');
    });
  }

  cadastrarEstabelecimento(estabelecimento){
    let data = { estabelecimento: estabelecimento }
    return this.http.post(`${this.api}/newestabelecimento`, data)
      .map((response: Response) => {
        return response.json();
      }
    );
}

cadastrarPessoa(pessoa){
  let data = { pessoa: pessoa }
  return this.http.post(`${this.api}/newpessoa`, data)
    .map((response: Response) => {
      return response.json();
    }
  );
}

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
