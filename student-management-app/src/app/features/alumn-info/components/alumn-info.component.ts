import { Alumn } from './../models/alumn.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlumnManagerServiceService } from '../services/alumn-manager-service.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { countries } from '../../util/country.data';
import { discardPeriodicTasks } from '@angular/core/testing';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-alumn-info',
  templateUrl: './alumn-info.component.html',
  styleUrls: ['./alumn-info.component.scss']
})
export class AlumnInfoComponent implements OnInit {

  public countries:any = countries;

  @Input("cleanForm") cleanForm !: Subject<boolean>;
  @Input("modifyAlumn") modifyAlumn !: Subject<Alumn>;

  public strenght: Subject<[AbstractControl | null, number]> = new Subject();
  public alumnData !: FormGroup;

  private passwordActualAlumn!: string;
  hidePassword: boolean = true;
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

      id: new FormControl('',
      [Validators.required, Validators.pattern('[0-9]{8,8}[A-Za-z]')]),

      phone: new FormControl('',
      [Validators.required, Validators.pattern('(0034|34)?[ -]*(6|7)([0-9]){2}[ -]?(([0-9]){2}[ -]?([0-9]){2}[ -]?([0-9]){2}|([0-9]){3}[ -]?([0-9]){3})')]),

      anotherPhone: new FormControl('',
      [Validators.pattern('(0034|34)?[ -]*(6|7)([0-9]){2}[ -]?(([0-9]){2}[ -]?([0-9]){2}[ -]?([0-9]){2}|([0-9]){3}[ -]?([0-9]){3})')]),

      country: new FormControl('', Validators.required),
      province: new FormControl('', Validators.required),
      postalCode: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      userName: new FormControl('', Validators.required),

      password: new FormControl('',
      [Validators.required, Validators.minLength(6)]),

      checkboxPassword: new FormControl('')

    })
  }

  ngOnInit(): void {
    this.cleanForm.subscribe( event =>{

      this.submitButtonMode = "Crear";
      this.alumnData.reset();
      this.alumnData.markAsUntouched();
      this.alumnData.markAsPristine();

    })

    this.modifyAlumn.subscribe( event => {

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
          checkboxPassword: ''
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
    } else {
      this.alumnData.get('password')?.disable();
      this.alumnData.get('password')?.setValue('');
    }
  }

  allowEditAlumnData(){
    this.alumnData.enable();
  }

  disableEditAlumnData(){
    this.alumnData.enable();
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

    this.alumnData.reset();
    this.alumnData.markAsUntouched();
    this.alumnData.markAsPristine();

  }

  calculateStrongness(){
    let password = this.alumnData.get('password')?.value;
    let points = 0;

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

    this.strenght.next([this.alumnData.get('password'),points]);
  }

  puntuationLess8Notification(event: boolean){

    this.showLess8Notification = event;
  }
}
