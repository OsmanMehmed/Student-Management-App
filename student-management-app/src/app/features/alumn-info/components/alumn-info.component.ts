import { Provincia } from './../../util/models/spanish.province.model';
import { Alumn } from './../models/alumn.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlumnManagerServiceService } from '../services/alumn-manager-service.service';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { countries } from '../../util/data/country.data';
import { provinces } from '../../util/data/spanish.provinces';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SpanishDniValidator } from '../../util/validators/spanish.dni.validator';
import { SpanishPhoneNumberValidator } from '../../util/validators/spanish.phoneNumber.validator';
import { SpanishPostalCodeValidator } from '../../util/validators/spanish.postalCode.validator';
import { ConfirmPasswordValidator } from '../../util/validators/confirmPassword.validator';
import { Countries } from '../../util/models/country.model';

@Component({
  selector: 'app-alumn-info',
  templateUrl: './alumn-info.component.html',
  styleUrls: ['./alumn-info.component.scss']
})
export class AlumnInfoComponent implements OnInit {

  public countries: Countries[] = countries;
  public provinces: Provincia[] = provinces;

  @Input("cleanForm") cleanForm !: Subject<boolean>;
  @Input("modifyAlumn") modifyAlumn !: Subject<Alumn>;

  public strenght: Subject<[AbstractControl | null, number]> = new Subject();
  public alumnData !: FormGroup;

  private passwordActualAlumn!: string;
  newUser: boolean = true;
  hidePassword: boolean = true;
  hidePasswordConfirm: boolean = true;
  submitButtonMode: string = "Crear";
  showLess8Notification: boolean = false;

  @Output() openSideNavEvent = new EventEmitter<number>();


  constructor(private form: FormBuilder,
              private alumnManager: AlumnManagerServiceService) {

    this.alumnData = this.form.group({

      name: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      email: new FormControl('',[Validators.required, Validators.email]),
      id: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      anotherPhone: new FormControl(''),
      country: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),
      password: new FormControl('',
      [Validators.required, Validators.minLength(6)]),

      passwordConfirm: new FormControl('', Validators.required),
      checkboxPassword: new FormControl('')
    })

    this.alumnData.get('passwordConfirm')?.addValidators(ConfirmPasswordValidator.isValidPassword(this.alumnData.get('password')));


  }

  ngOnInit(): void {
    this.cleanForm.subscribe( () =>{

      this.newUser = true;
      this.submitButtonMode = "Crear";
      this.alumnData.enable();
      this.alumnData.reset();
      this.alumnData.markAsUntouched();
      this.alumnData.markAsPristine();

    })

    this.modifyAlumn.subscribe( event => {

      this.alumnData.markAllAsTouched();
      this.alumnData.markAsDirty();

      this.newUser = false;
      this.submitButtonMode = "Guardar";
      this.alumnData.setValue(
        {
          name: event.name,
          middleName: event.middleName,
          email: event.email,
          id: event.userID,
          phone: event.phone,
          country: event.country,
          province: event.province,
          postalCode: event.postalCode,
          location: event.location,
          userName: event.nickName,
          password: '',
          anotherPhone: (event.otherPhone ?  event.otherPhone : ''),
          lastName: event.lastName,
          checkboxPassword: '',
          passwordConfirm: ''
        }
      )

      this.passwordActualAlumn = event.password;
      this.alumnData.disable();
    })
  }

  toggleSideNav(){
    this.openSideNavEvent.emit(-1);
  }

  toggleAccessEditPassword(event: MatCheckboxChange){

    if (event.checked){
      this.alumnData.get('password')?.enable();
      this.alumnData.get('passwordConfirm')?.enable();
    } else {
      this.alumnData.get('password')?.disable();
      this.alumnData.get('passwordConfirm')?.disable();
    }
  }

  allowEditAlumnData(){
    this.alumnData.enable();
    this.alumnData.get('password')?.disable();
    this.alumnData.get('passwordConfirm')?.disable();
  }

  disableEditAlumnData(){
    this.alumnData.disable();
  }

  saveAlumn(){
    let savePassword: string;

    if (this.alumnData.get('password')?.enabled){
      savePassword = this.alumnData.get('password')?.value;
      this.passwordActualAlumn = savePassword;

    } else {
      savePassword = this.passwordActualAlumn;
    }

    this.alumnManager.saveAlumn(
      {
        name: this.alumnData.get('name')?.value,
        middleName: this.alumnData.get('middleName')?.value,
        email: this.alumnData.get('email')?.value,
        userID: this.alumnData.get('id')?.value,
        phone: this.alumnData.get('phone')?.value,
        country: this.alumnData.get('country')?.value,
        province: this.alumnData.get('province')?.value,
        postalCode: this.alumnData.get('postalCode')?.value,
        location: this.alumnData.get('location')?.value,
        nickName: this.alumnData.get('userName')?.value,
        password: savePassword,
        otherPhone: this.alumnData.get('anotherPhone')?.value,
        lastName: this.alumnData.get('lastName')?.value,
      } as Alumn
    )

    this.newUser = true;
    this.submitButtonMode = "Crear";
    this.alumnData.enable();
    this.alumnData.reset();
    this.alumnData.markAsUntouched();
    this.alumnData.markAsPristine();
  }

  calculateStrongness(){
    let password = this.alumnData.get('password')?.value;
    let points = 0;

    if (password){

      // Longitud
      if (password.length == 7 && password.length == 8){
        points = points + 1;
      } else if (password.length >= 9 && password.length <= 12){
        points = points + 2;
      } else if (password.length > 12){
        points = points + 3;
      }

      // Contiene letras
      if (/[a-zA-Z]/.test(password)){
        points = points + 1;
      }

      // Uso de mayúsculas y minúsculas
      if (/[A-Z]/.test(password) && /[a-z]/.test(password)){
        points = points + 2;
      }

      // Uso de números
      if (/[0-9]/.test(password)){
        points = points + 1;
      }

      // Uso de símbolos
      if (/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(password)){
        points = points + 2;
      }

      // Si cumple con todo lo anterior se le da un punto extra
      if (points == 9){
        points = 10;
      }
    }
    this.strenght.next([this.alumnData.get('password'),points]);

  }

  triggerConfirmPasswordValidation(){

    this.alumnData.get('passwordConfirm')?.updateValueAndValidity();
  }

  puntuationLess8Notification(event: boolean){
    this.showLess8Notification = event;
  }

  resetValidatorsByCountrySelected(country: string){

    if (country == 'Spain'){
      this.alumnData.get('phone')?.addValidators(SpanishPhoneNumberValidator.isValidNumber());
      this.alumnData.get('phone')?.updateValueAndValidity();
      this.alumnData.get('id')?.addValidators(SpanishDniValidator.isValidDni());
      this.alumnData.get('id')?.updateValueAndValidity();
      this.alumnData.get('postalCode')?.addValidators(SpanishPostalCodeValidator.isValidNumber());
      this.alumnData.get('postalCode')?.updateValueAndValidity();

    } else {

      this.alumnData.get('phone')?.clearValidators();
      this.alumnData.get('phone')?.addValidators(Validators.required);
      this.alumnData.get('id')?.clearValidators();
      this.alumnData.get('id')?.addValidators(Validators.required);
      this.alumnData.get('postalCode')?.clearValidators();
      this.alumnData.get('postalCode')?.addValidators(Validators.required);

    }
  }

  resetProvince(){
    this.alumnData.get('province')?.setValue('');
    this.alumnData.get('province')?.updateValueAndValidity();

    this.alumnData.get('location')?.setValue('');
    this.alumnData.get('location')?.updateValueAndValidity();

    this.alumnData.get('postalCode')?.setValue('');
    this.alumnData.get('postalCode')?.updateValueAndValidity();
  }

}
