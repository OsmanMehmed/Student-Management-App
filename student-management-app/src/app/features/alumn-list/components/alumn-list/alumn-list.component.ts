import { BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Alumn } from 'src/app/features/alumn-info/models/alumn.model';
import { AlumnManagerServiceService } from 'src/app/features/alumn-info/services/alumn-manager-service.service';

@Component({
  selector: 'app-alumn-list',
  templateUrl: './alumn-list.component.html',
  styleUrls: ['./alumn-list.component.scss']
})
export class AlumnListComponent implements OnInit {

  @Output() closeSideNavEvent = new EventEmitter<number | string>();

  public selectedFilterOption!: string;
  public checkNameFilter: boolean = true;
  public checkIDFilter: boolean = false;
  public checkEmailFilter: boolean = false;
  public cardArray !: Alumn[];
  private cardArray$: BehaviorSubject<Alumn[]>;
  public filterAlumn: FormControl = new FormControl();


  constructor(public alumnManagerService: AlumnManagerServiceService) {
    this.cardArray$ = this.alumnManagerService.alumnList$;
    this.cardArray$.subscribe( list => {
      this.cardArray = list;
    })

  }

  ngOnInit(): void {

  }

  closeNavBar(){
    this.closeSideNavEvent.emit(0);
  }

  createNewUser(){
    this.closeSideNavEvent.emit(1);
  }

  loadExistingUser(alumnName: string){
    this.closeSideNavEvent.emit(alumnName);
  }

  checkAndFilter(mode: string,filter: string){

    if (mode == 'name'){
      this.checkNameFilter = true;
      this.checkIDFilter = false;
      this.checkEmailFilter = false;
    }

    if (mode == 'id'){
      this.checkNameFilter = false;
      this.checkIDFilter = true;
      this.checkEmailFilter = false;
    }

    if (mode == 'email'){
      this.checkNameFilter = false;
      this.checkIDFilter = false;
      this.checkEmailFilter = true;
    }

    this.filter(filter);

  }

  filter(filteringText: string){

    if (!!filteringText && filteringText.length > 0){

      if (this.checkNameFilter){
        this.cardArray = this.alumnManagerService.alumnList.filter( (element) => (element.name+element.middleName+element.lastName).toLowerCase().includes(filteringText.toLowerCase()));
      }

      if (this.checkIDFilter){
        this.cardArray = this.alumnManagerService.alumnList.filter( (element) => (element.userID.toLowerCase()).includes(filteringText.toLowerCase()));
      }

      if (this.checkEmailFilter){
        this.cardArray = this.alumnManagerService.alumnList.filter( (element) => (element.email.toLowerCase()).includes(filteringText.toLowerCase()));
      }
    } else {
      this.cardArray = this.alumnManagerService.alumnList;

    }
  }
}
