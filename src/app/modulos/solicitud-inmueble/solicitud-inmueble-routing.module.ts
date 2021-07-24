import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AceptarEliminarSolicitudComponent } from './aceptar-eliminar-solicitud/aceptar-eliminar-solicitud.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { EditarSolicitudComponent } from './editar-solicitud/editar-solicitud.component';
import { ListarSolicitudComponent } from './listar-solicitud/listar-solicitud.component';

const routes: Routes = [
  {
    path: 'crear-solicitud',
    component: CrearSolicitudComponent
  },
  {
    path: 'listar-solicitud',
    component: ListarSolicitudComponent
  },
  {
    path: 'editar-solicitud/:id',
    component: EditarSolicitudComponent
  },
  {
    path: 'aceptar-eliminar-solicitud/:id',
    component: AceptarEliminarSolicitudComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudInmuebleRoutingModule { }
