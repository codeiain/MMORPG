import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthApiProvider } from '../SystemProviders/AuthApiProvider';
import 'rxjs/add/operator/map';

@Injectable()
export class CharacterApiProvider {

  constructor(public http: Http, public authService: AuthApiProvider) {



  }

  createCharacter(character) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post('http://localhost:9001/api/characters/createCharacter', JSON.stringify(character), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  getChracters(playerId){
    return new Promise((resolve, reject)=>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post('http://localhost:9001/api/characters/getPlayerCharacters', JSON.stringify({playerId:playerId}), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  verifyCharacterName(name){
    return new Promise((resolve, reject)=>{
      let headers = new Headers
      headers.append('Content-Type','application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post('http://localhost:9001/api/characters/validateName', JSON.stringify({characterName:name}), {headers:headers})
      .map(res=> res.json())
      .subscribe(res=>{
        resolve(res);
      }, (err)=>{
        reject(err);
      });
    });
  }
}
