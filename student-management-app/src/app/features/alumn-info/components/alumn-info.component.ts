import { Alumn } from './../models/alumn.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlumnManagerServiceService } from '../services/alumn-manager-service.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { countries } from '../../util/country.data';

@Component({
  selector: 'app-alumn-info',
  templateUrl: './alumn-info.component.html',
  styleUrls: ['./alumn-info.component.scss']
})
export class AlumnInfoComponent implements OnInit {

  public hidePassword: boolean = true;
  public countries:any = countries;
  public checkboxPressed: boolean = false;
  public alumnEditable: boolean = false;
  public editingAlumn: boolean = false;
  @Input("cleanForm") cleanForm !: Subject<boolean>;
  @Input("modifyAlumn") modifyAlumn !: Subject<Alumn>;
  public strenght: Subject<[AbstractControl | null, number]> = new Subject();
  public alumnData!: FormGroup;
  private passwordActualAlumn!: string;
  public selectedCountry!: string;

  @Output() openSideNavEvent = new EventEmitter<number>();


  constructor(private form: FormBuilder,
              private alumnManager: AlumnManagerServiceService) {

    this.alumnData = this.form.group({

      name: new FormControl({value: '', disabled: this.alumnEditable}, [Validators.required]),

      middleName: new FormControl({value: '', disabled: this.alumnEditable}, Validators.required),

      lastName: new FormControl({value: '', disabled: this.alumnEditable}),

      email: new FormControl({value: '', disabled: this.alumnEditable},
                              [Validators.required,
                              Validators.email]),

      id: new FormControl({value: '', disabled: this.alumnEditable},
                          [Validators.required,
                          Validators.pattern('[0-9]{8,8}[A-Za-z]')]),

      phone: new FormControl({value: '', disabled: this.alumnEditable},
                              [Validators.required,
                              Validators.pattern('(0034|34)?[ -]*(6|7)([0-9]){2}[ -]?(([0-9]){2}[ -]?([0-9]){2}[ -]?([0-9]){2}|([0-9]){3}[ -]?([0-9]){3})')]),

      anotherPhone: new FormControl({value: '', disabled: this.alumnEditable},
                                    [Validators.pattern('(0034|34)?[ -]*(6|7)([0-9]){2}[ -]?(([0-9]){2}[ -]?([0-9]){2}[ -]?([0-9]){2}|([0-9]){3}[ -]?([0-9]){3})')]),

      country: new FormControl({value: '', disabled: this.alumnEditable}, Validators.required),

      province: new FormControl({value: '', disabled: this.alumnEditable}, Validators.required),

      postalCode: new FormControl({value: '', disabled: this.alumnEditable}, Validators.required),

      location: new FormControl({value: '', disabled: this.alumnEditable}, Validators.required),

      userName: new FormControl({value: '', disabled: this.alumnEditable}, Validators.required),

      password: new FormControl({value: '', disabled: this.alumnEditable},
                                [Validators.required,
                                  Validators.minLength(6)]),

      checkboxPassword: new FormControl({value: '', disabled: this.alumnEditable})

    })
  }

  ngOnInit(): void {
    this.cleanForm.subscribe( event =>{

      if (event){
        this.alumnEditable = true;
        this.editingAlumn = false;
        this.editing();
        this.alumnData.reset();
        this.alumnData.get('password')?.enable();
      }

    })

    this.modifyAlumn.subscribe( event => {

      this.alumnData.get('name')?.setValue(event.name);
      this.alumnData.get('middleName')?.setValue(event.middleName);
      this.alumnData.get('email')?.setValue(event.email);
      this.alumnData.get('id')?.setValue(event.userID);
      this.alumnData.get('phone')?.setValue(event.phone);
      this.alumnData.get('country')?.setValue(event.country);
      this.selectedCountry = event.country;
      this.alumnData.get('province')?.setValue(event.province);
      this.alumnData.get('postalCode')?.setValue(event.postalCode);
      this.alumnData.get('location')?.setValue(event.location);
      this.alumnData.get('userName')?.setValue(event.nickName);
      this.alumnData.get('password')?.setValue('');
      this.passwordActualAlumn = event.password;
      this.alumnData.get('anotherPhone')?.setValue(event.id);
      this.alumnData.get('lastName')?.setValue(event.lastName);

      this.alumnData.get('name')?.disable();
      this.alumnData.get('middleName')?.disable();
      this.alumnData.get('email')?.disable();
      this.alumnData.get('id')?.disable();
      this.alumnData.get('phone')?.disable();
      this.alumnData.get('country')?.disable();
      this.alumnData.get('province')?.disable();
      this.alumnData.get('postalCode')?.disable();
      this.alumnData.get('location')?.disable();
      this.alumnData.get('userName')?.disable();
      this.alumnData.get('password')?.disable();
      this.alumnData.get('anotherPhone')?.disable();
      this.alumnData.get('lastName')?.disable();

      this.alumnEditable = true;
      this.editingAlumn = true;
    })
  }

  toggleSideNav(){
    this.openSideNavEvent.emit(-1);
  }

  toggleCheckBox(){
    console.log(this.checkboxPressed);
    this.checkboxPressed = !this.checkboxPressed;

    if (this.checkboxPressed){
      this.alumnData.get('password')?.enable();
    } else {
      this.alumnData.get('password')?.disable();
      this.alumnData.get('password')?.setValue('');
    }
  }

  editing(){
    this.alumnEditable = !this.alumnEditable;

    if (this.alumnEditable){
      this.alumnData.get('name')?.disable();
      this.alumnData.get('middleName')?.disable();
      this.alumnData.get('email')?.disable();
      this.alumnData.get('id')?.disable();
      this.alumnData.get('phone')?.disable();
      this.alumnData.get('country')?.disable();
      this.alumnData.get('province')?.disable();
      this.alumnData.get('postalCode')?.disable();
      this.alumnData.get('location')?.disable();
      this.alumnData.get('userName')?.disable();
      this.alumnData.get('password')?.disable();
      this.alumnData.get('anotherPhone')?.disable();
      this.alumnData.get('lastName')?.disable();
    } else {
      this.alumnData.get('name')?.enable();
      this.alumnData.get('middleName')?.enable();
      this.alumnData.get('email')?.enable();
      this.alumnData.get('id')?.enable();
      this.alumnData.get('phone')?.enable();
      this.alumnData.get('country')?.enable();
      this.alumnData.get('province')?.enable();
      this.alumnData.get('postalCode')?.enable();
      this.alumnData.get('location')?.enable();
      this.alumnData.get('userName')?.enable();

      if (this.checkboxPressed){
        this.alumnData.get('password')?.enable();
      } else {
        this.alumnData.get('password')?.disable();
      }

      this.alumnData.get('anotherPhone')?.enable();
      this.alumnData.get('lastName')?.enable();
    }
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

    if (!this.editingAlumn){
      this.alumnData.reset();
    }

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

    if (points == 9){
      points = 10;
    }

    console.log(points);


    this.strenght.next([this.alumnData.get('password'),points]);
  }
}
