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

$(document).ready(function() {
  $('#empresa').on('keyup', function() {
      let nombreEmpresa = $(this).val();

      if (nombreEmpresa.length > 0) {
          $.ajax({
              url: 'buscar_empresa.php',
              type: 'POST',
              data: { buscar_empresa: nombreEmpresa },
              success: function(data) {
                  $('#resultados').html(data);
                  $('#resultados li').on('click', function() {
                  $('#empresa').val($(this).text());
                  $('#resultados').html('');
          });
        }
        });
      } else {
          $('#resultados').html('');
      }
  });
});


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
