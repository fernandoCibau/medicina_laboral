//------------------------------------------------------------------
//                  FORMULARIO
//------------------------------------------------------------------

$("#formAlta").submit((e) => {
  e.preventDefault();
  let form = $("#formAlta");
  let formData = new FormData(form[0]);
  for (let [key, value] of formData.entries()) {
    console.log(key + ": " + value);
  }
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
      let datos = JSON.parse(resultado);
      try {
        if (datos.operacion) {
          $("#mensaje").text(datos.mensaje);
          $("spam").removeClass("hidde");
          $("spam").removeClass("show-error");
          $(".loader").addClass("hidde");
          $("spam").addClass("show");
        } else {
          $("spam").text(datos.mensaje);
          $("spam").removeClass("hidde");
          $("spam").removeClass("show");
          $(".loader").addClass("hidde");
          $("spam").addClass("show-error");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
};

/* TRAE LA LISTA DE EMPRESAS A MEDIDA QUE ESCRIBO */

$(document).ready(function () {
  $("#empresa").on("keyup", function () {
    let nombreEmpresa = $(this).val();

    if (nombreEmpresa.length > 0) {
      $.ajax({
        url: "buscar_empresa.php",
        type: "POST",
        data: { buscar_empresa: nombreEmpresa },
        success: function (data) {
          $("#resultados").html(data);
          if (data.trim() !== "") {
            $("#resultados").addClass("visible");
          } else {
            $("#resultados").removeClass("visible");
          }
          $("#resultados li").on("click", function () {
            $("#empresa").val($(this).text());
            $("#resultados").html("");
            $("#resultados").removeClass("visible");
          });
        },
      });
    } else {
      $("#resultados").html("");
      $("#resultados").removeClass("visible");
    }
  });

  /*  OCULTA LA LISTA DE EMPRESAS CUANDO HAGO CLICK FUERA */

  $(document).on("click", function (e) {
    if (
      !$(e.target).closest("#empresa").length &&
      !$(e.target).closest("#resultados").length
    ) {
      $("#resultados").html("");
      $("#resultados").removeClass("visible");
    }
  });
});

//------------------------------------------------------------------
//                  BOTONES
//------------------------------------------------------------------

$("#btmCerrarSesion").one("click", () => {
  alertaCerrarSistema();
});

//Boton dni formulario alta usuario
$("#dni").on("input", () => {
  const digitos = $("#dni").val();
  if (digitos.length > 8) {
    // Limitar a los primeros 8 dígitos
    $("#dni").val(digitos.slice(0, 8));
  }
});
