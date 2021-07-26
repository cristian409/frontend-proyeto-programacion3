import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { rolModelo } from 'src/app/modelos/rol.modelo';
import { usuarioModelo } from 'src/app/modelos/usuario.modelo';
import { UsuariosService } from 'src/app/servicio/usuarios.service';

declare const abrirModal: any;
declare const confirmarModal: any;

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

  pagina: number = 1;
  listaRegistros: usuarioModelo[] = [];
  listaRoles: rolModelo[] = [];
  constructor(private servicio: UsuariosService) { }

  ngOnInit(): void {
    this.ListaRoles();
    this.ListarRegistros();
  }

  ListarRegistros(){
    this.servicio.ListarRegistros().subscribe(
      (datos) => {
        this.listaRegistros = datos;
        this.listaRegistros.forEach(elemento => {
          this.listaRoles.forEach(element => {
            if (elemento.rolId == element.id) {
              elemento.nombreRol = element.nombre
            }
          });
        });        
      },
      (error) => {
        abrirModal("Error", `Error listando los usuarios`);
      }
    );
  }

  ListaRoles(){
    this.servicio.ListarRegistrosRoles().subscribe(
      (datos) => {
        this.listaRoles = datos;
      },
      (error: any) => {
        abrirModal("Error", `Error listando los roles`);
      }
    );
  }

  verificarEliminacion() {
    confirmarModal("Confirmar Borrado", "Está seguro que quiere eliminar el registro?");
  }

  Eliminacion(codigo?: String, nombre?: String) {
    let modelo = new usuarioModelo();
    modelo.id = codigo;
    modelo.nombre = nombre;
    this.servicio.EliminarRegistro(modelo).subscribe(
      (datos) => {
        abrirModal("Información", `El Usuario ${nombre} a sido eliminado correctamente`);
        this.listaRegistros = this.listaRegistros.filter(x => x.id != codigo);
      },
      (error) => {
        abrirModal("¡Error!", `Error eliminando el Usuario ${nombre}`);
      }
    );
  }
}
