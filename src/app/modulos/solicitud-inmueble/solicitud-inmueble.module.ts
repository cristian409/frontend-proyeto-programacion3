import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudInmuebleRoutingModule } from './solicitud-inmueble-routing.module';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './editar-solicitud/editar-solicitud.component';
import { ListarSolicitudComponent } from './listar-solicitud/listar-solicitud.component';
import { EliminarSolicitudComponent } from './eliminar-solicitud/eliminar-solicitud.component';
import { AceptarEliminarSolicitudComponent } from './aceptar-eliminar-solicitud/aceptar-eliminar-solicitud.component';


@NgModule({
  declarations: [
    CrearSolicitudComponent,
    EditarSolicitudComponent,
    ListarSolicitudComponent,
    EliminarSolicitudComponent,
    AceptarEliminarSolicitudComponent
  ],
  imports: [
    CommonModule,
    SolicitudInmuebleRoutingModule
  ]
})
export class SolicitudInmuebleModule { }
