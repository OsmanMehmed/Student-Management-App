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

  constructor(public alumnManagerService: AlumnManagerServiceService) { }

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
