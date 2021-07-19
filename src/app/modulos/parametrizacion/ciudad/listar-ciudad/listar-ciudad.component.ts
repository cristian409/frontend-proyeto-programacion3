import { Component, OnInit } from '@angular/core';
import { CiudadModelo } from 'src/app/modelos/ciudad.modelo';
import { CiudadService } from 'src/app/servicio/ciudad.service';


declare const abrirModal: any;
declare const confirmarModal: any;
@Component({
  selector: 'app-listar-ciudad',
  templateUrl: './listar-ciudad.component.html',
  styleUrls: ['./listar-ciudad.component.css']
})
export class ListarCiudadComponent implements OnInit {

  pagina: number = 1;
  listaRegistros: CiudadModelo[] = [];
  constructor(private servicio: CiudadService) { }

  ngOnInit(): void {
    this.servicio.listarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        abrirModal("Error", `Error listando las ciudades`);
      }
    );
  }

  verificarEliminacion() {
    confirmarModal("Confirmar Borrado", "Está seguro que quiere eliminar el registro?");
  }

  Eliminacion(codigo?: Number, nombre?: String) {
    let modelo = new CiudadModelo();
    modelo.codigo = codigo;
    modelo.nombre = nombre;
    this.servicio.eliminarRegistro(modelo).subscribe(
      (datos) => {
        abrirModal("Información", `La ciudad ${nombre} a sido eliminado correctamente`);
        this.listaRegistros = this.listaRegistros.filter(x => x.codigo != codigo);
      },
      (error) => {
        abrirModal("¡Error!", `Error eliminando la ciudad ${nombre}`);
      }
    );
  }

}
