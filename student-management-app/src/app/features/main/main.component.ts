import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public sidenav: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSideNav(){
    this.sidenav = !this.sidenav;
  }

}
