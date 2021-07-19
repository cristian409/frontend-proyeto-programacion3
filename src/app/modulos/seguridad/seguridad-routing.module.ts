import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarClaveComponent } from './cambiar-clave/cambiar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component';
import { ResetearClaveComponent } from './resetear-clave/resetear-clave.component';

const routes: Routes = [
  {
    path: 'iniciar-sesion',
    component: IniciarSesionComponent
  },
  {
    path: 'cerrar-sesion',
    component: CerrarSesionComponent
  },
  {
    path: 'resetear-clave',
    component: ResetearClaveComponent
  },
  {
    path: 'cambiar-clave',
    component: CambiarClaveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
