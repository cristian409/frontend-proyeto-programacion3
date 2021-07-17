import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearBloqueComponent } from './bloque/crear-bloque/crear-bloque.component';
import { EditarBloqueComponent } from './bloque/editar-bloque/editar-bloque.component';
import { ListarBloqueComponent } from './bloque/listar-bloque/listar-bloque.component';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';
import { CrearProyectoComponent } from './proyecto/crear-proyecto/crear-proyecto.component';
import { EditarProyectoComponent } from './proyecto/editar-proyecto/editar-proyecto.component';
import { ListarProyectoComponent } from './proyecto/listar-proyecto/listar-proyecto.component';

const routes: Routes = [
  {
    path: 'crear-pais',
    component: CrearPaisComponent
  },
  {
    path: 'listar-pais',
    component: ListarPaisComponent
  },
  {
    path: 'editar-pais/:codigo',
    component: EditarPaisComponent
  },
  {
    path: 'crear-ciudades',
    component: CrearCiudadComponent
  },
  {
    path: 'listar-ciudades',
    component: ListarCiudadComponent
  },
  {
    path: 'editar-ciudades/:codigo',
    component: EditarCiudadComponent
  },
  {
    path: 'crear-proyectos',
    component: CrearProyectoComponent
  },
  {
    path: 'listar-proyectos',
    component: ListarProyectoComponent
  },
  {
    path: 'editar-proyectos/:codigo',
    component: EditarProyectoComponent
  },
  {
    path: 'crear-bloques',
    component: CrearBloqueComponent
  },
  {
    path: 'listar-bloques',
    component: ListarBloqueComponent
  },
  {
    path: 'editar-bloques/:codigo',
    component: EditarBloqueComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
