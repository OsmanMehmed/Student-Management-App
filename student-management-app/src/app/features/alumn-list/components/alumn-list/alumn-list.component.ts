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
  public cardArray: Alumn[];

  constructor(public alumnManagerService: AlumnManagerServiceService) {
    this.cardArray = this.alumnManagerService.alumnList
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

  filter(mode: string, event: any){


    if (mode == "name"){
      this.cardArray = this.alumnManagerService.alumnList.filter( (element) => (element.name+element.middleName+element.lastName).includes(event.target.value))
      console.log(this.cardArray);

    }

    if (mode == "id"){
      this.cardArray = this.alumnManagerService.alumnList.filter( (element) => (element.userID).includes(event.target.value))
    }

    if (mode == "email"){
      this.cardArray = this.alumnManagerService.alumnList.filter( (element) => (element.email).includes(event.target.value))
    }
  }


}
