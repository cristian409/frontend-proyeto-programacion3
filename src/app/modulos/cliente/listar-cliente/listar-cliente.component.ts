import { Component, OnInit } from '@angular/core';
import { ClienteModelo } from 'src/app/modelos/cliente.modelo';
import { ClienteService } from 'src/app/servicio/cliente.service';



declare const abrirModal: any;
declare const confirmarModal: any;
@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  pagina: number = 1;
  listaRegistros: ClienteModelo[] = [];
  constructor(private servicio: ClienteService) { }

  ngOnInit(): void {
    this.servicio.ListarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
      },
      (error) => {
        abrirModal("Error", `Error listando las Clientes`);
      }
    );
  }

  verificarEliminacion() {
    confirmarModal("Confirmar Borrado", "Está seguro que quiere eliminar el registro?");
  }

  Eliminacion(codigo?: Number, nombre?: String) {
    let modelo = new ClienteModelo();
    modelo.id = codigo;
    modelo.nombre = nombre;
    this.servicio.EliminarRegistro(modelo).subscribe(
      (datos) => {
        abrirModal("Información", `La Cliente ${nombre} a sido eliminado correctamente`);
        this.listaRegistros = this.listaRegistros.filter(x => x.id != codigo);
      },
      (error) => {
        abrirModal("¡Error!", `Error eliminando la Cliente ${nombre}`);
      }
    );
  }

}
