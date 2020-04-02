import { Injectable } from '@angular/core';
import {NbToastrService} from '@nebular/theme';
const electron = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private banco: any;
  private almacen: any;
  private cliente: any;
  private vendedor: any;
  private cacheBorrar: string;

  constructor(private toastService: NbToastrService) { }
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
  eliminarDato() {
    if (electron.ipcRenderer.sendSync('banco', 'DELETE FROM `registros` WHERE `FOLIO_MOV` = \'' + this.cacheBorrar + '\';')) {
      this.toastService.success('Operación exitosa', 'Exitoso', {duration: 7000, destroyByClick: true} );
    } else {
      this.toastService.danger('Error en la operación verifique la base de datos', 'Error', {duration: 7000, destroyByClick: true});
    }
  }
  setCacheBorrar(cache: string) {
    this.cacheBorrar = cache;
  }
  insertDato(sql: string) {
    if (electron.ipcRenderer.sendSync('banco', sql)) {
      this.toastService.success('Operación exitosa', 'Exitoso', {duration: 7000, destroyByClick: true});
    } else {
      this.toastService.danger('Error en la operación verifique la base de datos', 'Error', {duration: 7000, destroyByClick: true});
    }
  }
}
