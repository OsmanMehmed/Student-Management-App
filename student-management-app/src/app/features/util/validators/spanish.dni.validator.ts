import { AbstractControl, ValidatorFn } from '@angular/forms';

export class SpanishDniValidator {

  static isValidDni(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      return this._isCorrectDni(control.value) == null
        ? null
        : { resultado: 'Incorrecto' };
    };
  }

  private static _isCorrectDni(value: string) {
    if (!value) {
      return null;
    }

    const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    const nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    const nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    const str = value.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) {
      return { resultado: 'Incorrecto' };
    }

    const nie = str
      .replace(/^[X]/, '0')
      .replace(/^[Y]/, '1')
      .replace(/^[Z]/, '2');

    const letter = str.substring(str.length-1,str.length);
    const charIndex = parseInt(nie.substring(0, 8)) % 23;

    if (validChars.charAt(charIndex) === letter) {
      return null;
    }

    return { resultado: 'Incorrecto'};
  }

}
