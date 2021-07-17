import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { EliminarClienteComponent } from './eliminar-cliente/eliminar-cliente.component';
import { FinancieraClienteComponent } from './financiera-cliente/financiera-cliente.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearClienteComponent,
    EditarClienteComponent,
    ListarClienteComponent,
    EliminarClienteComponent,
    FinancieraClienteComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ClienteModule { }
