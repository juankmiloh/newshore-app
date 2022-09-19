import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertCurrency'
})
export class ConvertCurrencyPipe implements PipeTransform {

  transform(value): any {
    const currency = localStorage.getItem('valCurrency');
    let result = 0;
    if (currency === 'COP') {
      result = this.convertCOP(value);
    }
    if (currency === 'DOP') {
      result = this.convertDOP(value);
    }
    if (currency === 'US') {
      result = this.convertUS(value);
    }
    return result;
  }

  convertCOP(value) {
    return value * 4000;
  }
  
  convertDOP(value) {
    return value * 53.51;
  }
  
  convertUS(value) {
    return value * 1;
  }

}
