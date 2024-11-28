//----------------------------------------------------------------  
//          MODAL ALERTA CERRAR SESION
//----------------------------------------------------------------


const alertaCerrarSistema = () =>{

    const modal = 
    `
        <div id="alertModal" class="modal-overlay">
            <div class="modal-container">
                <!-- Logo -->
                <div class="modal-logo">
                    <img src='../icon/signo-de-exclamacion.png'  alt="signo-de-exclamacion">

                </div>
                <!-- Título y mensaje -->
                <div class="modal-title">¡Desea cerrar la sesión!</div>
                <div class="modal-message">¿Estás seguro de que deseas continuar con esta acción?</div>
                <!-- Botones -->
                <div class="modal-buttons">
                    <button class="modal-button" onclick="aceptarCerrar()">Aceptar</button>
                    <button class="modal-button cancel" onclick="cancelarAccion()">Cancelar</button>
                </div>
            </div>
        </div>
    `

    $('main').append(modal);

}

const  aceptarCerrar = () =>{
    despedida();
}

const cancelarAccion = () => {
    $("#alertModal").remove();
}

const despedida = () =>{

    $("#alertModal").remove();

    const modal = 
    `
        <div class="mensaje-despedida" id="mensajeDespedida">
            <h2>¡Hasta luego! ¡Esperamos verte pronto!</h2>
        </div>
    `
    $('main').append(modal);

    setTimeout(function() {
        $("#mensajeDespedida").remove();
        window.location.href = "../cerrarSesion.php";
    }, 3000);

}


//----------------------------------------------------------------  
//          
//----------------------------------------------------------------