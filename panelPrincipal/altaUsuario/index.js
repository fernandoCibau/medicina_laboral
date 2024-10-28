//------------------------------------------------------------------
//                  FORMULARIO
//------------------------------------------------------------------

$("#formAlta").submit((e) => {
  e.preventDefault();
  let form = $("#formAlta");
  let formData = new FormData(form[0]);
  ajaxUsuarioAlta(formData);
});

//------------------------------------------------------------------
//                  FUNCIONES
//------------------------------------------------------------------

let ajaxUsuarioAlta = (formData) => {
  $.ajax({
    url: "altaUsuarioNacho.php",
    method: "post",
    data: formData,
    contentType: false,
    processData: false,

    success: (resultado, estado) => {
      console.log(resultado);
    },
  });
};

//------------------------------------------------------------------
//                  BOTONES
//------------------------------------------------------------------
$("#btmCerrarSesion").click(() => {
  if (confirm("¿Confirmar?")) {
    location.href = "../../cerrarSesion.php";
  }
});

//Boton dni formulario alta usuario
$("#dni").on("input", () => {
  const digitos = $("#dni").val();
  if (digitos.length > 8) {
    // Limitar a los primeros 8 dígitos
    $("#dni").val(digitos.slice(0, 8));
  }
});
