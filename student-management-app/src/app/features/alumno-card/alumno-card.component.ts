import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alumno-card',
  templateUrl: './alumno-card.component.html',
  styleUrls: ['./alumno-card.component.scss']
})
export class AlumnoCardComponent implements OnInit {

  public hide: boolean = true;

  @Output() openSideNavEvent = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void {
  }

  toggleSideNav(){
    this.openSideNavEvent.emit();
  }

}
