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

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  name: string;
  size: string;
  kind: string;
  items?: number;
  childEntries?: FSEntry[];
  expanded?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'adminstax';
  show: boolean;
   constructor(private sidebarService: NbSidebarService, private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>) {
     this.dataSource = this.dataSourceBuilder.create(this.data);
     this.show = false;
  }
  customColumn = 'name';
  defaultColumns = [ 'size', 'kind', 'items' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];
  source: NbTreeGridDataSource<FSEntry>;
  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  private data: TreeNode<FSEntry>[] = [
    {
      data: { name: 'Projects', size: '1.8 MB', items: 5, kind: 'dir' }
    },
    {
      data: { name: 'Reports', kind: 'dir', size: '400 KB', items: 2 }
    },
    {
      data: { name: 'Other', kind: 'dir', size: '109 MB', items: 2 }
    },
  ];


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
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }

  search() {
          this.show = !this.show;
  }
}
