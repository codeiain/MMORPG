import { Injectable } from '@angular/core';
import { HttpModule, Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { ConfigProvider } from './ConfigProvider'
/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthApiProvider {

  public token: any;
  public apiServer: string;

  constructor(public http: Http, public storage: Storage, public config: ConfigProvider) {
    let env: string = config.getEnv('env');
    console.log(env);
    this.apiServer = config.getConfig('apiServer');
  }

  checkAuthentication() {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        this.token = value;
        let headers = new Headers();
        headers.append('Authorzation', this.token);

        this.http.get(this.apiServer + '/auth/protected', { headers: headers })
          .subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          })

      })
    })
  };


  createAccount(details) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.apiServer + '/auth/register', JSON.stringify(details), { headers: headers })
        .subscribe(res => {
          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          this.storage.set('playerId', data.user._id);
          resolve(data);
        }, (err) => {
          reject(err);
        })
    });
  };

  login(credentials) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(this.apiServer + '/auth/login', JSON.stringify(credentials), { headers: headers })
        .subscribe(res => {

          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          this.storage.set('playerId', data.user._id);
          resolve(data);

          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });

  }

  logout() {
    this.storage.set('token', '');
  }

  createAuthorizationHeaders() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', this.token);
    return headers;
  }

}
