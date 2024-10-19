export const alertExitoso = (mensaje) =>{
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
    });
};

export const alertMensaje = (mensaje) =>{
    Swal.fire(mensaje);
};
