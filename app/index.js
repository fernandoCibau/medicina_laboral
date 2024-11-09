//-----------------------------------------------------------------
//                      FORM
//-----------------------------------------------------------------
$("#formSesion").submit((e) => {
  e.preventDefault();
  let form = $("#formSesion");
  let formData = new FormData(form[0]);
  ajaxAutenticacion(formData);
});

//-----------------------------------------------------------------
//                      FUNCIONES
//-----------------------------------------------------------------
const ajaxAutenticacion = (formData) => {
  $.ajax({
    url: "autenticacion.php",
    method: "post",
    data: formData,
    contentType: false,
    processData: false,

    success: (resultado, estado) => {
      try {
        let datos = JSON.parse(resultado);

        if (datos.operacion) {
          location.href = "./panelPrincipal";
        } else {
          alert(datos.mensaje);
          erroresSoloLocalHost( datos.error );
        }
      } catch (e) {
        alert('Ocurrió un error al procesar la respuesta del servidor.');
        const error = e.message + " | " + resultado;
        erroresSoloLocalHost( error );
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
        alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
        const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
        erroresSoloLocalHost( error );
    }
  });
};


const erroresSoloLocalHost = ( error ) =>{
  window.isDevelopment = true ? console.log( error )  : "";
}