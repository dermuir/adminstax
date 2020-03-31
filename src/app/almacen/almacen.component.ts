import { Component, OnInit } from '@angular/core';
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
import {DatosService} from '../datos.service';

interface TreeAlmacen<T> {
  data: T;
}

interface Almacenes {
  FOLIO_ENTRADA: number; MES: string; FECHA_ENTRADA: string;
  ID_PROVEEDOR: number;
  PROVEEDOR: string; FACTURA: number; CODIGO_PRODUCTO: string;
  DESCRIPCION: string; UNIDAD_MEDIDA: string; CANTIDAD: number;
  P_UNITARIO: number;
  SUB_TOTAL: number;
  IVA: number;
  TOTAL: number;
}

@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.scss']
})
export class AlmacenComponent implements OnInit {
  almancenInfo: any;
  almacenVal: any;
  show: boolean;
  private data: TreeAlmacen<Almacenes>[];
  private datas: TreeAlmacen<Almacenes>;
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<Almacenes>, private db: DatosService) {
     this.data = [];
     this.db.almacenes('SELECT * FROM `registros` ORDER BY `FOLIO_ENTRADA` DESC');
     this.almancenInfo = this.db.getdataAlmacen();
     this.declareData();
     this.dataSource = this.dataSourceBuilder.create(this.data);
     this.show = false;
  }
  customColumn = 'FOLIO_ENTRADA';
  defaultColumns = [ 'MES', 'FECHA_ENTRADA', 'ID_PROVEEDOR', 'PROVEEDOR',
    'FACTURA', 'CODIGO_PRODUCTO',
  'DESCRIPCION',
  'UNIDAD_MEDIDA',
  'CANTIDAD',
  'P_UNITARIO',
  'SUB_TOTAL',
  'IVA',
  'TOTAL'];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  source: NbTreeGridDataSource<Almacenes>;
  dataSource: NbTreeGridDataSource<Almacenes>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  declareData() {
    for (this.almacenVal of this.almancenInfo) {
      this.datas = {
        data: { FOLIO_ENTRADA: this.almacenVal.FOLIO_ENTRADA,
            MES: this.almacenVal.MES.toString(),
            FECHA_ENTRADA: this.almacenVal.FECHA_ENTRADA.toString(),
            ID_PROVEEDOR: this.almacenVal.ID_PROVEEDOR,
            PROVEEDOR: this.almacenVal.PROVEEDOR.toString(),
            FACTURA: this.almacenVal.FACTURA,
            CODIGO_PRODUCTO: this.almacenVal.CODIGO_PRODUCTO.toString(),
            DESCRIPCION: this.almacenVal.DESCRIPCION.toString(),
            UNIDAD_MEDIDA: this.almacenVal.UNIDAD_MEDIDA.toString(),
            CANTIDAD: this.almacenVal.CANTIDAD,
            P_UNITARIO: this.almacenVal.P_UNITARIO,
            SUB_TOTAL: this.almacenVal.SUB_TOTAL,
            IVA: this.almacenVal.IVA,
            TOTAL: this.almacenVal.TOTAL
        }
      };
      this.data.push(this.datas);
    }
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
  search() {
          this.show = !this.show;
  }
  ngOnInit(): void {
  }

}
