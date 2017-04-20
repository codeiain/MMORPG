import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { ModalCharacter } from '../pages/home/Modal/ModalCharacter'
import { ModalIntro } from '../pages/home/Modal/ModalIntro';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocketService } from '../providers/socket-service/socket-service';
import { GameMain } from '../providers/GameService/GameMain';
import {SettingsService} from '../providers/OptionServices/SettingsService';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    ModalCharacter,
    ModalIntro,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    ModalCharacter,
    ModalIntro,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocketService,
    GameMain,
    SettingsService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
