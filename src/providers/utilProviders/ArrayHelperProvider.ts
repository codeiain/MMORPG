import { Injectable } from '@angular/core';

@Injectable()
export class ArrayHelperProvider{


  /**
   * Searches for a object in the array matching on key.
   * 
   * @param {any[]} array the array to search in 
   * @param {any} obj  the object to search for
   * @returns {boolean}
   * 
   * @memberof ArrayHelperProvider
   */
  containsKey(array:any[], obj:any):boolean {
    var i = array.length;
    while (i--) {
      if (array[i].key === obj.key) {
        return true;
      }
    }
    return false;
  }
}

