let confirmarModal = (titulo, mensaje) => {
    document.querySelector(`#tituloModal1`).innerHTML = titulo;
    document.querySelector(`#textoModal1`).innerHTML = mensaje;
    var elemento = document.querySelector(`#confimacionModal`);
    let instance = M.Modal.init(elemento, {});
    instance.open();
}


let abrirModal = (titulo, mensaje) => {
    document.querySelector(`#tituloModal`).innerHTML = titulo;
    document.querySelector(`#textoModal`).innerHTML = mensaje;
    var elemento = document.querySelector(`#mensajeModal`);
    let instance = M.Modal.init(elemento, {});
    instance.open();
}