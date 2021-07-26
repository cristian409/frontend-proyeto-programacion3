export class SolicitudModelo {
    id?: Number;
    fecha?: String;
    ofertaEconomica?:number;
    estado?: String;
    inmuebleId?: number;
    clienteId?: number;
    aceptarCancelarSolicitud: String = "Pendiente";
}