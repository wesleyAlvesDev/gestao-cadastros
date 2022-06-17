import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { IConfig, NgxMaskModule } from 'ngx-mask';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';


export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    ClientesFormComponent,
    ClientesListComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(),

  ],
  exports: [
    ClientesFormComponent,
    ClientesListComponent,
  ]
})
export class ClientesModule { }
