import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCiudadComponent } from './ciudad/crear-ciudad/crear-ciudad.component';
import { EditarCiudadComponent } from './ciudad/editar-ciudad/editar-ciudad.component';
import { ListarCiudadComponent } from './ciudad/listar-ciudad/listar-ciudad.component';
import { CrearPaisComponent } from './pais/crear-pais/crear-pais.component';
import { EditarPaisComponent } from './pais/editar-pais/editar-pais.component';
import { ListarPaisComponent } from './pais/listar-pais/listar-pais.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrizacionRoutingModule { }
