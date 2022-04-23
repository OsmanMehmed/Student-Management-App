import { AbstractControl, ValidatorFn } from '@angular/forms';

export class SpanishPhoneNumberValidator {

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

    let validRegEx = /^(0034|\+34|34)?\+?(6\d{2}|7[1-9]\d{1})\d{6}$/;

    if (!validRegEx.test(value)){
      return { resultado: 'Incorrecto'};
    } else {
      return null;
    }

  }
}


