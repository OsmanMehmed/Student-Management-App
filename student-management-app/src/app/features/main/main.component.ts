import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Alumn } from '../alumn-info/models/alumn.model';
import { AlumnManagerServiceService } from '../alumn-info/services/alumn-manager-service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public sidenav: boolean = false;
  public modifyAlumn: Subject<Alumn> = new Subject();
  public cleanForm: Subject<boolean> = new Subject();



  constructor(public alumnManagerService: AlumnManagerServiceService) {

    alumnManagerService.saveAlumn(
      {
        name: 'Osman',
        middleName: 'Mehmed',
        email: 'correoPersonalizado@gmail.com',
        userID: 'X5477834Q',
        phone: '674437559',
        country: 'Spain',
        province: 'Madrid',
        postalCode: '28454',
        location: 'Madrid',
        nickName: 'Hellow',
        password: 'Hd8yg328*',
        otherPhone: '',
        lastName: '',

      } as Alumn
    );

    alumnManagerService.saveAlumn(
      {
        name: 'Jhon',
        middleName: 'Countyburry',
        email: 'email@gmail.com',
        userID: '003217834Q',
        phone: '07987654321',
        country: 'United Kingdom of Great Britain and Northern Ireland',
        province: 'London',
        postalCode: '86454',
        location: 'London',
        nickName: 'Hellow',
        password: 'Hd8ydsadag328*',
        otherPhone: '',
        lastName: '',

      } as Alumn
    );

    alumnManagerService.saveAlumn(
      {
        name: 'Ki',
        middleName: 'Yan',
        email: 'Ki.Yan@gmail.com',
        userID: '6105281953061519530615X',
        phone: '+8616533907254',
        country: 'China',
        province: 'Pekin',
        postalCode: '065001',
        location: 'Pekín',
        nickName: 'Junior',
        password: 'HDASKDNOASU837676RH*',
        otherPhone: '008618463707254',
        lastName: 'Frin',

      } as Alumn
    );


  }

  ngOnInit(): void {
  }

  toggleSideNav(event: number | string){


    if (!Number.isNaN(event) && event == 1){
      this.cleanForm.next(true);

    } else {
      event = ''+ event;
      let alumnString = this.alumnManagerService.getAlumn(event)

      if (alumnString !== null){
        let alumnObject = JSON.parse(alumnString) as Alumn;
        this.modifyAlumn.next(alumnObject);
      }

    }

    this.sidenav = !this.sidenav;
  }

}
