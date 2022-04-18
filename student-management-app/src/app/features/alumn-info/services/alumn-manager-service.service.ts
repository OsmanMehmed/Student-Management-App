import { Injectable } from '@angular/core';
import { Alumn } from '../models/alumn.model';

@Injectable({
  providedIn: 'root'
})


export class AlumnManagerServiceService {
  private _alumnList: Alumn[] = [];

  constructor() {

    for (let y = 0; y < localStorage.length; y++){

      if (localStorage.key(y) != null){
        let name = localStorage.key(y);
        let alumn: string | null;

        if (name == null){
          name = '';
        } else {
          alumn = '';
        }

        alumn = localStorage.getItem(name)

        if (alumn !== null) this._alumnList.push(JSON.parse(alumn) as Alumn);
      }
    }
  }

  public get alumnList(): Alumn[] {
    return this._alumnList;
  }
  public set alumnList(value: Alumn[]) {
    this._alumnList = value;
  }

  public saveAlumn(alumn: Alumn){

   if (this._alumnList.some((element) => element.name == alumn.name)){

      let alumnIndex = this._alumnList.findIndex( (element) => element.name == alumn.name)
      this._alumnList[alumnIndex] = alumn;

    } else {
      this._alumnList.push(alumn);

    }

    localStorage.setItem(alumn.name, JSON.stringify(alumn));

  }

  public deleteAlumn(alumn: string){
    let deleteAlumn = this._alumnList.find( (element) => element.name == alumn);

    if (deleteAlumn !== undefined){
      this._alumnList.splice(this._alumnList.indexOf(deleteAlumn),1);
    }

    localStorage.removeItem(alumn);
  }

  public getAlumn(name: string){
    return localStorage.getItem(name);
  }

  // FILTRAR POR NOMBRE


  // FILTRAR POR APELLIDOS


  // FILTRAR POR DNI


  // FILTRAR POR EMAIL


  // ELIMINAR ALUMNO POR ID


}
