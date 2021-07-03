import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ListadoSolicitudComponent } from './listado-solicitud/listado-solicitud.component';


@NgModule({
  declarations: [
    ListadoSolicitudComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }
