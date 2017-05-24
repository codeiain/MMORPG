import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthApiProvider } from '../../providers/SystemProviders/AuthApiProvider';
import { CharactersPage } from '../characters/characters';
 
@Component({
  selector: 'signup-page',
  templateUrl: 'signup-page.html'
})
export class SignupPage {
 
  role: string;
  email: string;
  password: string;
  loading:any;
  constructor(public navCtrl: NavController, public authService: AuthApiProvider, public loadingCtrl: LoadingController) {
    this.loading = loadingCtrl.create({content:'loading...'});

  }
 
  register(){
 
    this.showLoader();
 
    let details = {
        email: this.email,
        password: this.password,
        role: 'player'
    };
 
    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(CharactersPage);
    }, (err) => {
        this.loading.dismiss();
    });
 
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }
 
}
