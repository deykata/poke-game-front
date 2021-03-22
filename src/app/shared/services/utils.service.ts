import { Injectable } from '@angular/core';

export enum RandomTypeArrayTypes {
  Number = 'number',
  Object = 'object'
}

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getRandomItems(total: any, amount: number, type: RandomTypeArrayTypes) {
    let randomArray: any = [];
    new Array(amount).fill(0).forEach(() => {
      switch (type) {
        case 'number':
          randomArray.push(Math.floor(Math.random() * total));
          break;
        case 'object':
          randomArray.push(total[Math.floor(Math.random() * total.length)]);
          break;
          
        default:
          break;
      }
    });
    return randomArray;
  }

  filterArrays(outer: Array<any>, inner: Array<any>) {
    return outer = outer.filter(item => {
      return !inner.includes(item); 
    });
  }
}
