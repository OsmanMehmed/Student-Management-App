import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-strength-bar',
  templateUrl: './strength-bar.component.html',
  styleUrls: ['./strength-bar.component.scss'],
})
export class StrengthBarComponent implements OnInit {
  @Input('strenght') strenght!: Subject<[AbstractControl | null, number]>;

  @Output('puntuationLess8') puntuationLess8: EventEmitter<boolean> = new EventEmitter<boolean>();

  private readonly COLORS = {
    default: 'black',
    empty: 'grey',
    error: 'red',
    highWarning: 'black',
    lowWarning: 'red',
    correct: 'green',
    strong: 'blue',
    veryStrong: 'purple'
  };

  private readonly OPTIONS = {
    empty: {
      message: '',
      color: this.COLORS.empty,
      styles: [this.COLORS.empty, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty],
    },
    minLength: {
      message: 'Introduce al menos 6 caracteres',
      color: this.COLORS.error,
      styles: [this.COLORS.empty, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty],
    },
    veryWeak: {
      message: 'Muy Débil',
      color: this.COLORS.highWarning,
      styles: [this.COLORS.highWarning, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty],
    },
    weak: {
      message: 'Débil',
      color: this.COLORS.lowWarning,
      styles: [this.COLORS.lowWarning, this.COLORS.lowWarning, this.COLORS.empty, this.COLORS.empty, this.COLORS.empty],
    },
    moderated: {
      message: 'Moderada',
      color: this.COLORS.correct,
      styles: [this.COLORS.correct, this.COLORS.correct, this.COLORS.correct, this.COLORS.empty, this.COLORS.empty],
    },
    strong: {
      message: 'Fuerte',
      color: this.COLORS.strong,
      styles: [this.COLORS.strong, this.COLORS.strong, this.COLORS.strong, this.COLORS.strong, this.COLORS.empty],
    },
    veryStrong: {
      message: 'Muy Fuerte',
      color: this.COLORS.veryStrong,
      styles: [this.COLORS.veryStrong, this.COLORS.veryStrong, this.COLORS.veryStrong, this.COLORS.veryStrong, this.COLORS.veryStrong],
    },

  };

  message: string = this.OPTIONS.empty.message;
  styles: string[] = this.OPTIONS.empty.styles;
  color: string = this.OPTIONS.empty.color;

  constructor() {}

  ngOnInit(): void {
    if (!!this.strenght) {

      this.strenght.subscribe(controller => {

        if (controller[1] < 8){
          this.puntuationLess8.emit(true);
        } else {
          this.puntuationLess8.emit(false);
        }

        if (controller[0] !== null){

          if (!controller[0].value || controller[0].value.length === 0) {
            this.color = this.OPTIONS.empty.color;
            this.message = this.OPTIONS.empty.message;
            this.styles = this.OPTIONS.empty.styles;
          } else if (controller[0].value.length < 6) {
            this.color = this.OPTIONS.minLength.color;
            this.message = this.OPTIONS.minLength.message;
            this.styles = this.OPTIONS.minLength.styles;
          } else if (controller[1] >= 1 && controller[1] <= 2){
            this.color = this.OPTIONS.veryWeak.color;
            this.message = this.OPTIONS.veryWeak.message;
            this.styles = this.OPTIONS.veryWeak.styles;
          } else if (controller[1] >= 3 && controller[1] <= 5) {
            this.color = this.OPTIONS.weak.color;
            this.message = this.OPTIONS.weak.message;
            this.styles = this.OPTIONS.weak.styles;
          } else if (controller[1] > 5 && controller[1] <= 7) {
            this.color = this.OPTIONS.moderated.color;
            this.message = this.OPTIONS.moderated.message;
            this.styles = this.OPTIONS.moderated.styles;
          } else if (controller[1] >= 8 && controller[1] <= 9) {
            this.color = this.OPTIONS.strong.color;
            this.message = this.OPTIONS.strong.message;
            this.styles = this.OPTIONS.strong.styles;
          } else if (controller[1] >= 10 ) {
            this.color = this.OPTIONS.veryStrong.color;
            this.message = this.OPTIONS.veryStrong.message;
            this.styles = this.OPTIONS.veryStrong.styles;
          }
        }
      });
    }
  }

  getBackground(color: string) {
    return { 'background-color': color };
  }
}
