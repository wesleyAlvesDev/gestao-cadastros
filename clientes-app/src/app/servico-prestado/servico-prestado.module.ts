import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule , ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ServicoPrestadoRoutingModule } from './servico-prestado-routing.module';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { ServicoPrestadoListComponent } from './servico-prestado-list/servico-prestado-list.component';

import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ServicoPrestadoFormComponent,
    ServicoPrestadoListComponent],
  imports: [
    CommonModule,
    ServicoPrestadoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(),

  ],
  exports: [
    ServicoPrestadoFormComponent,
    ServicoPrestadoListComponent
  ]
})
export class ServicoPrestadoModule { }
