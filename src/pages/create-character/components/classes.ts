import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClassesApiProvider } from '../../../providers/ClassesProviders/ClassesApiProvider'
@Component({
  selector: 'page-create-character-classes',
  templateUrl: 'classes.html',
})
export class CreatCharacterClasses {
  classes: Array<any>;

  constructor(public classesProvider: ClassesApiProvider) {

  }
  ngOnInit() {
    var _self = this;
    this.classesProvider.getAllClasses().then((data: any) => {
      _self.classes = data.classes;
    })
  }
}