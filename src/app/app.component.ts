import { Component } from '@angular/core';
import {
  NbMenuService,
  NbSidebarService,
  NbSearchService,
  NbSidebarModule,
  NbMenuItem,
  NbIconLibraries,
  NbGetters,
  NbTreeGridDataSource,
  NbTreeGridDataSourceBuilder, NbSortDirection, NbSortRequest
} from '@nebular/theme';
import {DatosService} from './datos.service';

interface TreeNode<T> {
  data: T;
}

interface FSEntry {
  FOLIO_MOV: number; MES: string; BANCO: string; FECHA: string; DESCRIPCION: string; INGRESOS: number; EGRESOS: number;
  ID_NOMBRE: number; NOMBRE: string; FACTURA: number; ID_VENDEDOR: number; VENDEDOR: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adminstax';
  show: boolean;
  arg: any;
  private datasa: TreeNode<FSEntry>[];

   constructor(private sidebarService: NbSidebarService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private db: DatosService) {
     this.db.bancos('SELECT * FROM registros');
     this.arg = this.db.getdataBanco();
     this.declareData();
     this.dataSourcea = this.dataSourceBuilder.create(this.datasa);
     this.show = false;
     console.log('vista', this.arg[0].MES);
     // console.log(almancenInfo[0]);
  }
  customColumna = 'FOLIO_MOV';
  defaultColumnas = [ 'MES', 'BANCO', 'FECHA', 'DESCRIPCION', 'INGRESOS', 'EGRESOS',
  'ID_NOMBRE',
  'NOMBRE',
  'FACTURA',
  'ID_VENDEDOR',
  'VENDEDOR'];
  allColumnas = [ this.customColumna, ...this.defaultColumnas ];
  source: NbTreeGridDataSource<FSEntry>;
  dataSourcea: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  declareData() {
   this.datasa = [
      {
        data: { FOLIO_MOV: this.arg[0].FOLIO_MOV, MES: this.arg[0].MES.toString(), BANCO: this.arg[0].BANCO.toString(),
  FECHA: this.arg[0].FECHA.toString(), DESCRIPCION: this.arg[0].DESCRIPCION.toString(), INGRESOS: this.arg[0].INGRESOS,
  EGRESOS: this.arg[0].EGRESOS,
  ID_NOMBRE: this.arg[0].ID_NOMBRE,
  NOMBRE: this.arg[0].NOMBRE.toString(),
  FACTURA: this.arg[0].FACTURA,
  ID_VENDEDOR: this.arg[0].ID_VENDEDOR,
  VENDEDOR: this.arg[0].VENDEDOR.toString()}
      }
    ];
  }


  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
}
