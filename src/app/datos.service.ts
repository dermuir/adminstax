import { Injectable } from '@angular/core';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private banco: any;
  private almacen: any;
  private cliente: any;
  private vendedor: any;

  constructor() { }
  bancos(sql: string) {
    this.setdataBanco(electron.ipcRenderer.sendSync('banco', sql));
  }
  getdataAlmacen(): any {
    return this.almacen;
  }

  setdataAlmacen(value: any) {
    this.almacen = value;
  }
  almacenes(sql: string) {
    console.log(sql);
    this.setdataAlmacen(electron.ipcRenderer.sendSync('almacen', sql));
    console.log(this.almacen);
  }
  setdataBanco(arg: any) {
    this.banco = arg;
  }
  getdataBanco(): any {
    return this.banco;
  }
  clientes() {
    this.setClientes(electron.ipcRenderer.sendSync('banco', 'SELECT RAZON_SOCIAL FROM `catalogo_cliente`'));
  }
  getClientes(): any {
    return this.cliente;
  }
  setClientes(value: any) {
    this.cliente = value;
  }
  vendedores() {
    this.setVendedores(electron.ipcRenderer.sendSync('banco', 'SELECT `NOMBRE` FROM `catalogo_vendedor`'));
  }
  getVendedores(): any {
    return this.vendedor;
  }
  setVendedores(value: any) {
    this.vendedor = value;
  }
}
