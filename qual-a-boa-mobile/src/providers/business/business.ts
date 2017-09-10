import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class BusinessProvider {
  person: any;
  estabelecimentoatual: any;
  type: any;
  latitude: number = 0;
  longitude: number = 0;
  public api = "http://192.168.0.104:8080";
  // 172.18.0.82
 // public api = 'http://api-qual.herokuapp.com';
// public api= "http://172.18.0.82:3000";
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

  setEstabelecimentoAtual(estabelecimento){
    this.estabelecimentoatual = estabelecimento;
  }

  getEstabelecimentoAtual(){
    return this.estabelecimentoatual;
  }
  getEstabelecimentos() {
    return this.http.get(`${this.api}/estabelecimentos`)
     .map((response: Response) => {
       return response.json();
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
  validateUser(objeto){
    let data = {docs : objeto}
    console.log(JSON.stringify(data));
    return this.http.post(`${this.api}/validateuser`, data)
      .map((response: Response) => {
        console.log("Response====> ", response.json());
        return response.json();
      }
    );
  }

  updateUser(objeto){
    let data = {docs : objeto}
    console.log(JSON.stringify(data));
    return this.http.post(`${this.api}/updateuser`, data)
      .map((response: Response) => {
        console.log("Response====> ", response.json());
        return response.json();
      }
    );
  }

  public getCardapio(id){
    return this.http.post(`${this.api}/getusercardapio`, {'idEstabelecimento': id})
    .map((response: Response) => {
        console.log("Response====> ", response.json());
        return response.json();
      }
    );
  }

  addCardapio(item){
    let data = {item: item};
    console.log(data);
    return this.http.post(`${this.api}/additem`, data)
    .map((response: Response) => {
        console.log("Response====> ", response.json());
        return response.json();
      }

    );
  }

  public  setLocation(lat, long){
    this.latitude = lat;
    this.longitude = long;
  }

  public getLat(){
    return this.latitude;
  }

  public getLong(){
    return this.longitude;
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
