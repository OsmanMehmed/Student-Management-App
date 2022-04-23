import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ConfirmPasswordValidator {

  static isValidPassword(password: AbstractControl | null): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this._isCorrectPassword(control.value, password) == null
        ? null
        : { resultado: 'Incorrecto' };
    };
  }

  private static _isCorrectPassword(value: string, password: AbstractControl | null) {
    if (!value) {
      return null;
    }

    if (value !== password?.value){
      return { resultado: 'Incorrecto'};
    } else {
      return null;
    }
  }
}
