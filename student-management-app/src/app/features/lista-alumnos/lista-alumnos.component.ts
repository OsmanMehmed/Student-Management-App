import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})
export class ListaAlumnosComponent implements OnInit {

  @Output() closeSideNavEvent = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideNav(){
    this.closeSideNavEvent.emit();
  }

}
