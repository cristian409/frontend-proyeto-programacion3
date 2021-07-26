import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './publico/errores/error404/error404.component';
import { InfoProyectoComponent } from './publico/info-proyecto/info-proyecto.component';
import { InicioComponent } from './publico/inicio/inicio.component';


const routes: Routes = [
  { 
    path:'inicio',
    component: InicioComponent 
  },
  { 
    path:'',
    pathMatch: 'full',
    redirectTo: '/inicio'
  },
  { 
    path:'info-proyecto/:id',
    component: InfoProyectoComponent 
  },
  {
    path: 'parametros',
    loadChildren: () => import('./modulos/parametrizacion/parametrizacion.module').then(m => m.ParametrizacionModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./modulos/seguridad/seguridad.module').then(m => m.SeguridadModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./modulos/cliente/cliente.module').then(m => m.ClienteModule)
  },
  {
    path: 'solicitud',
    loadChildren: () => import('./modulos/solicitud-inmueble/solicitud-inmueble.module').then(m => m.SolicitudInmuebleModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./modulos/usuario/usuario.module').then(m => m.UsuarioModule)
  },
  { 
    path:'error-404',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: '/error-404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
