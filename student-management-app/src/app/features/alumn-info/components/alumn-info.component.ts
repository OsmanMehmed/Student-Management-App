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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPasswordComponent } from './confirmation-password/confirmation-password.component';


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

  public strenght$: Subject<[AbstractControl | null, number]> = new Subject();
  public alumnData !: FormGroup;

  private passwordActualAlumn!: string;
  newUser: boolean = true;
  hidePassword: boolean = true;
  hidePasswordConfirm: boolean = true;
  submitButtonMode: string = "Crear";
  showLess8Notification: boolean = false;

  @Output() openSideNavEvent = new EventEmitter<number>();


  constructor(private form: FormBuilder,
              private alumnManager: AlumnManagerServiceService,
              private dialog: MatDialog) {

    this.assignDefaultValidators();

    this.alumnData.get('passwordConfirm')?.addValidators(ConfirmPasswordValidator.isValidPassword(this.alumnData.get('password')));

  }

  ngOnInit(): void {
    this.cleanForm.subscribe( () =>{

      this.hardResetValues();
    })

    this.modifyAlumn.subscribe( event => {

      this.alumnData.markAllAsTouched();
      this.alumnData.markAsDirty();
      this.newUser = false;
      this.submitButtonMode = "Guardar";

      this.loadValues({
        name: event.name,
        middleName: event.middleName,
        email: event.email,
        userID: event.userID,
        phone: event.phone,
        country: event.country,
        province: event.province,
        postalCode: event.postalCode,
        location: event.location,
        nickName: event.nickName,
        password: '',
        otherPhone: (event.otherPhone ?  event.otherPhone : ''),
        lastName: event.lastName
      } as Alumn);

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

  showConfirmPasswordDialog(){

    let savePassword: string;
    let alteredPassword: boolean;

    if (this.alumnData.get('password')?.enabled){
      savePassword = this.alumnData.get('password')?.value;
      alteredPassword = true;

    } else {
      savePassword = this.passwordActualAlumn;
      alteredPassword = false;
    }

    let alumn =
      {
        name: this.alumnData.get('name')?.value,
        middleName: this.alumnData.get('middleName')?.value,
        email: this.alumnData.get('email')?.value,
        userID: this.alumnData.get('userID')?.value,
        phone: this.alumnData.get('phone')?.value,
        country: this.alumnData.get('country')?.value,
        province: this.alumnData.get('province')?.value,
        postalCode: this.alumnData.get('postalCode')?.value,
        location: this.alumnData.get('location')?.value,
        nickName: this.alumnData.get('nickName')?.value,
        password: savePassword,
        otherPhone: this.alumnData.get('otherPhone')?.value,
        lastName: this.alumnData.get('lastName')?.value,
      } as Alumn;


    const dialogRef = this.dialog.open(ConfirmationPasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.alumnManager.saveAlumn(alumn, alteredPassword);
      } else {
        this.loadValues(alumn);
      }
    });

    this.hardResetValues();
  }

  saveAlumn(){

    let savePassword: string;
    let alteredPassword: boolean;

    if (this.alumnData.get('password')?.enabled){
      savePassword = this.alumnData.get('password')?.value;
      alteredPassword = true;

    } else {
      savePassword = this.passwordActualAlumn;
      alteredPassword = false;
    }

    this.alumnManager.saveAlumn(
      {
        name: this.alumnData.get('name')?.value,
        middleName: this.alumnData.get('middleName')?.value,
        email: this.alumnData.get('email')?.value,
        userID: this.alumnData.get('userID')?.value,
        phone: this.alumnData.get('phone')?.value,
        country: this.alumnData.get('country')?.value,
        province: this.alumnData.get('province')?.value,
        postalCode: this.alumnData.get('postalCode')?.value,
        location: this.alumnData.get('location')?.value,
        nickName: this.alumnData.get('nickName')?.value,
        password: savePassword,
        otherPhone: this.alumnData.get('otherPhone')?.value,
        lastName: this.alumnData.get('lastName')?.value,
      } as Alumn, alteredPassword
    )

    this.hardResetValues();
  }

  softResetValues(){
    this.hidePassword = true;
    this.hidePasswordConfirm = true;
    this.showLess8Notification = false;
  }

  hardResetValues(){

    this.newUser = true;
    this.hidePassword = true;
    this.hidePasswordConfirm = true;
    this.submitButtonMode = "Crear";
    this.showLess8Notification = false;
    this.alumnData.enable();
    this.alumnData.reset();
  }

  loadValues(data: Alumn){

    this.alumnData.setValue(
      {
        name: data.name,
        middleName: data.middleName,
        email: data.email,
        userID: data.userID,
        phone: data.phone,
        country: data.country,
        province: data.province,
        postalCode: data.postalCode,
        location: data.location,
        nickName: data.nickName,
        password: '',
        otherPhone: (data.otherPhone ?  data.otherPhone : ''),
        lastName: data.lastName,
        checkboxPassword: '',
        passwordConfirm: ''
      }
    )

    this.passwordActualAlumn = data.password;
  }

  assignDefaultValidators(){

    this.alumnData = this.form.group({
      name: new FormControl('', Validators.required),
      middleName: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      email: new FormControl('',[Validators.required, Validators.email]),
      userID: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      otherPhone: new FormControl(''),
      country: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      nickName: new FormControl('', Validators.required),
      password: new FormControl('',[Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', Validators.required),
      checkboxPassword: new FormControl('')
    });
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
    this.strenght$.next([this.alumnData.get('password'),points]);

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
      this.alumnData.get('userID')?.addValidators(SpanishDniValidator.isValidDni());
      this.alumnData.get('userID')?.updateValueAndValidity();

    } else {

      this.alumnData.get('phone')?.clearValidators();
      this.alumnData.get('phone')?.addValidators(Validators.required);
      this.alumnData.get('userID')?.clearValidators();
      this.alumnData.get('userID')?.addValidators(Validators.required);
      this.alumnData.get('postalCode')?.clearValidators();
      this.alumnData.get('postalCode')?.addValidators(Validators.required);

    }
  }

  resetValidatorsByProvinceSelected(province: string){
    this.alumnData.get('postalCode')?.addValidators(SpanishPostalCodeValidator.isValidNumber(this.alumnData.get('province')?.value));
    this.alumnData.get('postalCode')?.updateValueAndValidity();
  }

  resetProvince(){
    this.alumnData.get('province')?.setValue('');
    this.alumnData.get('province')?.updateValueAndValidity();
  }

  resetLocation(){
    this.alumnData.get('location')?.setValue('');
    this.alumnData.get('location')?.updateValueAndValidity();
  }

  resetPostalCode(){
    this.alumnData.get('postalCode')?.setValue('');
    this.alumnData.get('postalCode')?.updateValueAndValidity();
  }

}
