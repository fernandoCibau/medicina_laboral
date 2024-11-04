import { errores } from './funcion.js';

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
        }
      } catch (e) {
        alert(  "Error en la autenticacion de los datos." );
        errores( e.message +  " | " + resultado)
      }
    },
  });
};

// const errores = ( error ) => {
//   $.ajax({
//     url: "erroresJs.php",
//     method: "post",
//     data: {error: error},

//     success: (resultado, estado) => {
//       try {
//         let datos = JSON.parse(resultado);

//         console.log(estado);

//       } catch (error) {
//         console.log(resultado);
//         console.error("Error en la autenticacion de los datos:", error);
//         alert(
//           "Error en la autenticacion de datos. Consulta la consola para más detalles."
//         );
//       }
//     },
//   });
// };