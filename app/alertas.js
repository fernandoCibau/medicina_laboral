

window.hostLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

window.hostDominio = window.location.origin;  // Obtiene la URL base (dominio + protocolo)

console.log(window.hostLocal)

//----------------------------------------------------------------
//          MODAL ALERTA CERRAR SESION
//----------------------------------------------------------------

const alertaCerrarSistema = () => {

  let imageUrl; 
  
  if (window.hostLocal) {
    imageUrl = `${window.hostDominio}/MEDICINA_LABORAL/app/icon/signo-de-exclamacion.png`;
  } else {
    imageUrl = `${window.hostDominio}/app/icon/signo-de-exclamacion.png`;
  }

  const modal = `
        <div id="alertModal" class="modal-overlay">
            <div class="modal-container">
                <!-- Logo -->
                <div class="modal-logo">
                    <img src='${imageUrl }'  alt="signo-de-exclamacion">
                </div>
                <!-- Título y mensaje -->
                <div class="modal-title">Cerrar sesión</div>
                <div class="modal-message">¿Estás seguro de que deseas continuar?</div>
                <!-- Botones -->
                <div class="modal-buttons">
                    <button class="modal-button" onclick="aceptarCerrar()">Aceptar</button>
                    <button class="modal-button cancel" onclick="cancelarAccion()">Cancelar</button>
                </div>
            </div>
        </div>
    `;

  $("main").append(modal);
};

const aceptarCerrar = () => {
  despedida();
};

const cancelarAccion = () => {
  $("#alertModal").remove();
};


const despedida = () => {
  $("#alertModal").remove();

  const modal = `
        <div class="mensaje-despedida" id="mensajeDespedida">
            <h2>¡Hasta luego! ¡Esperamos verte pronto!</h2>
        </div>
    `;
  $("main").append(modal);

    setTimeout(function() {
        $("#mensajeDespedida").remove();
        if( window.hostLocal ){
          window.location.href = `${window.hostDominio }/MEDICINA_LABORAL/app/cerrarSesion.php` 
        }else{
          window.location.href = `${window.hostDominio }/app/cerrarSesion.php`
        }
    }, 3000);

}


//----------------------------------------------------------------
//              ALERTA BOTON BORRAR
//----------------------------------------------------------------

// NO ESTA FUNCIONANDO / FALTA..!

const alertaBorrar = () =>{

    const modal = 
    `
        <div id="alertModal" class="modal-overlay">
            <div class="modal-container">
                <!-- Logo -->
                <div class="modal-logo">
                    <img src="app/sistema_de_turnos/icon/bote-de-basura.png" alt="Logo">

                </div>
                <!-- Título y mensaje -->
                <div class="modal-title">¿Está seguro de que desea eliminar?</div>
                <div class="modal-message">¿Estás a punto de eliminar  un turno, continuar con esta acción?</div>
                <!-- Botones -->
                <div class="modal-buttons">
                    <button class="modal-button" onclick="aceptarBorrar()">Aceptar</button>
                    <button class="modal-button cancel" onclick="cancelarAccion()">Cancelar</button>
                </div>
            </div>
        </div>
    `

    $('main').append(modal);

}


const aceptarBorrar = () =>{
  alert('SEE')
}



//----------------------------------------------------------------
//             
//----------------------------------------------------------------