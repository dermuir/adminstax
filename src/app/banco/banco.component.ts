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
  NbTreeGridDataSourceBuilder, NbSortDirection, NbSortRequest, NbDialogService
} from '@nebular/theme';
import {DatosService} from '../datos.service';
import {DialogoComponent} from '../dialogo/dialogo.component';
import {Router} from '@angular/router';

interface TreeNode<T> {
  data: T;
}
interface FSEntry {
  FOLIO_MOV: number; MES: string; BANCO: string; FECHA: string; DESCRIPCION: string; INGRESOS: number; EGRESOS: number;
  ID_NOMBRE: number; NOMBRE: string; FACTURA: number; ID_VENDEDOR: number; VENDEDOR: string;
}

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.scss']
})
export class BancoComponent implements OnInit {
  show: boolean;
  arg: any;
  val: any;
  private datasa: TreeNode<FSEntry>[];
  private datasas: TreeNode<FSEntry>;
  constructor(private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>, private db: DatosService, private dialogService: NbDialogService, private router: Router) {
     this.datasa = [];
     this.db.bancos('SELECT * FROM registros order by `FOLIO_MOV` desc');
     this.arg = this.db.getdataBanco();
     this.declareData();
     this.dataSourcea = this.dataSourceBuilder.create(this.datasa);
     this.show = false;
  }

  customColumna = 'FOLIO_MOV';
  defaultColumnas = [ 'MES', 'BANCO', 'FECHA', 'DESCRIPCION', 'INGRESOS', 'EGRESOS',
  'ID_NOMBRE',
  'NOMBRE',
  'FACTURA',
  'ID_VENDEDOR',
  'VENDEDOR'];
  lastColumna = 'OPCIONES';
  allColumnas = [ this.customColumna, ...this.defaultColumnas, this.lastColumna ];
  source: NbTreeGridDataSource<FSEntry>;
  dataSourcea: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  declareData() {
    for (this.val of this.arg) {
      this.datasas = {
        data: {
          FOLIO_MOV: this.val.FOLIO_MOV, MES: this.val.MES.toString(), BANCO: this.val.BANCO.toString(),
          FECHA: this.val.FECHA.toString(), DESCRIPCION: this.val.DESCRIPCION.toString(), INGRESOS: this.val.INGRESOS,
          EGRESOS: this.val.EGRESOS,
          ID_NOMBRE: this.val.ID_NOMBRE,
          NOMBRE: this.val.NOMBRE.toString(),
          FACTURA: this.val.FACTURA,
          ID_VENDEDOR: this.val.ID_VENDEDOR,
          VENDEDOR: this.val.VENDEDOR.toString()
        }
      };
      this.datasa.push(this.datasas);
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
  eliminarDato(row: any) {
    this.db.setCacheBorrar(row.data.FOLIO_MOV);
    this.dialogService.open(DialogoComponent, { hasBackdrop: true });
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/banco']);
  }
}
