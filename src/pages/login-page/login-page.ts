import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { AuthApiProvider } from '../../providers/SystemProviders/AuthApiProvider';
import { CharactersPage } from '../characters/characters';
import { SignupPage } from '../signup-page/signup-page';
 
@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {
 
    email: string;
    password: string;
    loading: any;
 
    constructor(public navCtrl: NavController, public authService: AuthApiProvider, public loadingCtrl: LoadingController) {
 
    }
 
    ionViewDidLoad() {
 
        this.showLoader();
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(CharactersPage);
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
 
    }
 
    login(){
 
        this.showLoader();
 
        let credentials = {
            email: this.email,
            password: this.password
        };
 
        this.authService.login(credentials).then((result) => {
            this.loading.dismiss();
            console.log(result);
            this.navCtrl.setRoot(CharactersPage);
        }, (err) => {
            this.loading.dismiss();
            console.log(err);
        });
 
    }
 
    launchSignup(){
        this.navCtrl.push(SignupPage);
    }
 
    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }
 
}