import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { FinancieraClienteComponent } from './financiera-cliente/financiera-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';

const routes: Routes = [
  {
    path: 'crear-clientes',
    component: CrearClienteComponent
  },
  {
    path: 'listar-clientes',
    component: ListarClienteComponent
  },
  {
    path: 'editar-clientes/:id',
    component: EditarClienteComponent
  },
  {
    path: 'financiera-clientes/:id',
    component: FinancieraClienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
