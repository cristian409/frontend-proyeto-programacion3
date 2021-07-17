function abrirModalMensaje(id, titulo, mensaje) {
    abrirModal(id, titulo, mensaje);
}

function modalConfirmacion(id, titulo, mensaje) {
    abrirModal(id, titulo, mensaje);
}

let abrirModal = (modalId, titulo, mensaje) => {
    document.querySelector(`#titulo`).innerHTML = titulo;
    document.querySelector(`#mensaje`).innerHTML = mensaje;
    var elemento = document.querySelector(`#${modalId}`);
    let instance = M.Modal.init(elemento, {});
    instance.open();
}