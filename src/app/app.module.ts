
//Angular and ionic components
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http, Headers, HttpModule } from '@angular/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { SignupPage } from '../pages/signup-page/signup-page';
import { CharactersPage } from '../pages/characters/characters';
import { CreateCharacter } from '../pages/create-character/create-character';

//Controlls
import { ModalCharacter } from '../pages/home/Modal/ModalCharacter'
import { ModalIntro } from '../pages/home/Modal/ModalIntro';
import { CreatCharacterName } from '../pages/create-character/components/name'
import { CreatCharacterClasses } from '../pages/create-character/components/classes'
import { CreatCharacterRace } from'../pages/create-character/components/race';
import { CreatCharacterStats} from '../pages/create-character/components/stats';
import {ModalRace} from '../pages/create-character/modal/ModalRace';
//Services
import { SocketService } from '../providers/socket-service/socket-service';
import { GameMain } from '../providers/GameService/GameMain';
import { SettingsService } from '../providers/OptionServices/SettingsService';
import { Auth } from '../providers/auth';
import { Characters } from '../providers/characters';
import { RaceProvider } from '../providers/raceProvider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ModalCharacter,
    ModalIntro,
    LoginPage,
    SignupPage,
    CharactersPage,
    CreateCharacter,
    CreatCharacterName,
    CreatCharacterClasses,
    CreatCharacterRace,
    CreatCharacterStats,
    ModalRace
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ModalCharacter,
    ModalIntro,
    LoginPage,
    SignupPage,
    CharactersPage,
    CreateCharacter,
    ModalRace
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocketService,
    GameMain,
    SettingsService,
    Auth,
    Characters,
    RaceProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
