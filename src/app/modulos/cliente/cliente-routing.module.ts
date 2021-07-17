import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';

const routes: Routes = [
  {
    path: 'crear-clientes',
    component: CrearClienteComponent
  },
  {
    path: 'listar-clientes',
    component: ListarClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
