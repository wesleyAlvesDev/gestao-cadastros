import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { AuthGuard } from "../guard/auth.guard";

const routes: Routes = [
  {
    path: 'clientes', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: '/clientes/list', pathMatch: 'full' },
      { path: 'form', component: ClientesFormComponent },
      { path: 'form/:id', component: ClientesFormComponent },
      { path: 'list', component: ClientesListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
