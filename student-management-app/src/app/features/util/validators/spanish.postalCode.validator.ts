import { provinces } from './../data/spanish.provinces';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { Provincia } from '../models/spanish.province.model';

export class SpanishPostalCodeValidator {

  public static provincesLoaded: Provincia[] = provinces;


  static isValidNumber(province: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this._isCorrectNumber(control.value, province) == null
        ? null
        : { resultado: 'Incorrecto' };
    };
  }

  private static _isCorrectNumber(value: string, province: string) {



    if (!value) {
      return null;
    }

    let validRegEx = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;

    if (!validRegEx.test(value)){
      return { resultado: 'Incorrecto'};
    } else {

      let provinceFound: Provincia | undefined = this.provincesLoaded.find( element => element.name == province);

      console.log(provinceFound?.name);
      console.log(provinceFound?.cod);
      console.log(value);
      console.log(value.slice(0,2));



      if (provinceFound){
        if (value.slice(0,2) == provinceFound.cod){

          return null;

        } else{
          return { resultado: 'Incorrecto'};

        }
      } else {

        return { resultado: 'Incorrecto'};

      }
    }

  }
}

