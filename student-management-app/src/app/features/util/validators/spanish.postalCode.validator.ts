import { AbstractControl, ValidatorFn } from '@angular/forms';

export class SpanishPostalCodeValidator {

  static isValidNumber(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this._isCorrectNumber(control.value) == null
        ? null
        : { resultado: 'Incorrecto' };
    };
  }

  private static _isCorrectNumber(value: string) {
    if (!value) {
      return null;
    }

    let validRegEx = /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/;

    if (!validRegEx.test(value)){
      return { resultado: 'Incorrecto'};
    } else {
      return null;
    }

  }
}

