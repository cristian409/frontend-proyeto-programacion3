import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagosRoutingModule } from './pagos-routing.module';
import { CrearPagosComponent } from './crear-pagos/crear-pagos.component';
import { ListarPagosComponent } from './listar-pagos/listar-pagos.component';
import { EliminarPagosComponent } from './eliminar-pagos/eliminar-pagos.component';


@NgModule({
  declarations: [
    CrearPagosComponent,
    ListarPagosComponent,
    EliminarPagosComponent
  ],
  imports: [
    CommonModule,
    PagosRoutingModule
  ]
})
export class PagosModule { }
