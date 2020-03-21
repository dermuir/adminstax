import { Injectable } from '@angular/core';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor() { }
  query(sql: string) {
    electron.ipcRenderer.send('query', sql);
    electron.ipcRenderer.on('querys', (event, arg) => {
    console.log(arg); // prints "pong"
  });
  }
}
