import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guard/auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { ServicoPrestadoFormComponent } from './servico-prestado-form/servico-prestado-form.component';
import { ServicoPrestadoListComponent } from './servico-prestado-list/servico-prestado-list.component';


const routes: Routes = [
  {
    path: 'servico-prestado', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: 'servicos-prestados/list', pathMatch: 'full' },
      { path: 'form', component: ServicoPrestadoFormComponent },
      { path: 'list', component: ServicoPrestadoListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicoPrestadoRoutingModule { }
