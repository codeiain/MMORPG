
//Angular and ionic components
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, APP_INITIALIZER } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Http, Headers, HttpModule } from '@angular/http';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FormWizardModule } from 'angular2-wizard';
import { RoundProgressModule } from 'angular-svg-round-progressbar';

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
import { CreatCharacterRace } from '../pages/create-character/components/race';
import { CreatCharacterStats } from '../pages/create-character/components/stats';
import { CreateCharacterGeneder } from '../pages/create-character/components/gender';
import { CreateCharacterSkills } from '../pages/create-character/components/skills';
import { ModalRace } from '../pages/create-character/modal/ModalRace';


//Services
import { DragulaModule, DragulaService } from "ng2-dragula/ng2-dragula";

import { SocketProvider } from '../providers/SocketProviders/SocketProvider';
import { GameMain } from '../providers/GameService/GameMain';

import { SettingsProvider } from '../providers/OptionProviders/SettingsProvider';
import { AuthApiProvider } from '../providers/SystemProviders/AuthApiProvider';

import { CharacterProvider } from '../providers/CharacterProviders/CharacterProvider';
import { CharacterApiProvider } from '../providers/CharacterProviders/CharacterApiProvider';
import { CharacterDisplayProvider } from '../providers/CharacterProviders/CharacterDisplayProvider';
import { CharacterStatsProviders } from '../providers/CharacterProviders/CharacterStatsProviders';

import { RaceApiProvider } from '../providers/RaceProviders/RaceApiProvider';

import { ClassesApiProvider } from '../providers/ClassesProviders/ClassesApiProvider';
import { ConfigProvider } from '../providers/SystemProviders/ConfigProvider';

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
    CreateCharacterGeneder,
    CreateCharacterSkills,
    ModalRace,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    FormWizardModule,
    DragulaModule,
    RoundProgressModule
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
    SocketProvider,
    GameMain,
    SettingsProvider,
    AuthApiProvider,
    CharacterApiProvider,
    RaceApiProvider,
    CharacterProvider,
    CharacterDisplayProvider,
    CharacterStatsProviders,
    DragulaService,
    ClassesApiProvider,
    ConfigProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: APP_INITIALIZER, useFactory: (config: ConfigProvider) => () => config.load(), deps: [ConfigProvider], multi: true }
  ]
})
export class AppModule { }
