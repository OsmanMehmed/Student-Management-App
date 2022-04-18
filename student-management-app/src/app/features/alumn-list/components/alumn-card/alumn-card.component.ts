import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AlumnManagerServiceService } from 'src/app/features/alumn-info/services/alumn-manager-service.service';

@Component({
  selector: 'app-alumn-card',
  templateUrl: './alumn-card.component.html',
  styleUrls: ['./alumn-card.component.scss']
})
export class AlumnCardComponent implements OnInit {

  constructor(private alumnManagerService: AlumnManagerServiceService) { }

  @Input("name") name!: string;
  @Output() userEdit = new EventEmitter<string>();
  ngOnInit(): void {
  }

  modifyUser(){
    this.userEdit.emit(this.name);
  }

  deleteUser(){
    this.alumnManagerService.deleteAlumn(this.name);
  }
}
