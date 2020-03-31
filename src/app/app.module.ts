import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DatosService} from './datos.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbActionsModule,
  NbSidebarModule,
  NbTreeGridModule,
  NbCardModule,
  NbButtonModule, NbDialogModule, NbInputModule,
  NbTooltipModule, NbSelectModule, NbAutocompleteModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule } from '@nebular/theme';
import { BancoComponent } from './banco/banco.component';
import { RouterModule, Routes } from '@angular/router';
import { AlmacenComponent } from './almacen/almacen.component';
import {config} from 'rxjs';
import { AddalmacenComponent } from './addalmacen/addalmacen.component';
import { AddbancoComponent } from './addbanco/addbanco.component';
import {ReactiveFormsModule} from '@angular/forms';

const appRoutes: Routes = [
  { path: 'banco', component: BancoComponent },
  { path: 'almacen', component: AlmacenComponent },
  { path: 'addalmacen', component: AddalmacenComponent },
  { path: 'addbanco', component: AddbancoComponent }
];

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    BancoComponent,
    AlmacenComponent,
    AddalmacenComponent,
    AddbancoComponent
  ],
  imports: [
    NbThemeModule.forRoot({name: 'aquamarine'}),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbSidebarModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbActionsModule,
    NbActionsModule,
    NbTreeGridModule,
    NbCardModule,
    NbButtonModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
    NbDialogModule.forRoot(),
    NbInputModule,
    NbTooltipModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbAutocompleteModule
  ],
  providers: [DatosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
