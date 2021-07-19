import { Component, OnInit } from '@angular/core';
import { datosGenerales } from 'src/app/config/datos.generales';
import { PaisModelo } from 'src/app/modelos/pais.modelo';
import { PaisService } from 'src/app/servicio/pais.service';


declare const abrirModal: any;
declare const confirmarModal: any;
@Component({
  selector: 'app-listar-pais',
  templateUrl: './listar-pais.component.html',
  styleUrls: ['./listar-pais.component.css']
})
export class ListarPaisComponent implements OnInit {
  pagina: number = 1;
  listaRegistros: PaisModelo[] = [];
  constructor(private servicio: PaisService) { }

  ngOnInit(): void {
    this.servicio.listarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        abrirModal("¡Error!", "Error listando los paises");
      }
    );
  }

  verificarEliminacion() {
    confirmarModal("Confirmar Borrado", "Está seguro que quiere eliminar el registro?");
  }

  Eliminacion(codigo?: number, nombre?: String) {
    let modelo = new PaisModelo();
    modelo.codigo = codigo;
    modelo.nombre = nombre;
    this.servicio.eliminarRegistro(modelo).subscribe(
      (datos) => {
        abrirModal("Información", `El pais ${nombre} a sido eliminado correctamente`);
        this.listaRegistros = this.listaRegistros.filter(x => x.codigo != codigo);
      },
      (error) => {
        abrirModal("¡Error!", `Error eliminando el pais ${nombre}`);
      }
    );
  }

}
