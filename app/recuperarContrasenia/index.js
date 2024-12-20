//------------------------------------------------------------------
//                  FORMULARIO
//------------------------------------------------------------------

$("#formContraseña").submit((e) => {
  e.preventDefault();
  let form = $("#formContraseña");
  let formData = new FormData(form[0]);
  $(".loader").removeClass("hidde");
  envioDeCorreo(formData);
});

$("#formActualizarContrasenia").submit((e) => {
  e.preventDefault();
  let form = $("#formActualizarContrasenia");
  let formData = new FormData(form[0]);

  let checkEmails = (formData) => {
    $.ajax({
      url: "auntenticacionDeCorreo.php",
      method: "post",
      data: formData,
      contentType: false,
      processData: false,
      success: (resultado, estado) => {
        let datos = JSON.parse(resultado);
        if (datos.operacion) {
          if ($("#contrasenia").val() == $("#contrasenia2").val()) {
            $(".loader").removeClass("hidde");
            actuContra(formData);
            window.location.href = "../index.php";
          } else {
            $("p").removeClass("hidde");
            $("#mensaje2").text("Las contraseñas deben coincidir");
          }
        } else if (datos.operacion == false) {
          $("p").removeClass("hidde");
          $("#mensaje2").text("El correo no pertenece a un usuario");
        }
      },
    });
  };

  checkEmails(formData);
});

//------------------------------------------------------------------
//                  FUNCIONES
//------------------------------------------------------------------

let envioDeCorreo = (formData) => {
  $.ajax({
    url: "enviarCorreoContrasenia.php",
    method: "post",
    data: formData,
    contentType: false,
    processData: false,
    success: (resultado, estado) => {
      let datos = JSON.parse(resultado);
      console.log(datos.mensaje);
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

let actuContra = (formData) => {
  $.ajax({
    url: "actualizarContrasenia.php",
    method: "post",
    data: formData,
    contentType: false,
    processData: false,
    success: (resultado, estado) => {
      alert(resultado);
      $("#mensaje").text(resultado);
    },
  });
};

let checkEmails = (formData) => {
  result = "dasdsa";
  $.ajax({
    url: "auntenticacionDeCorreo.php",
    method: "post",
    data: formData,
    contentType: false,
    processData: false,
    success: (resultado, estado) => {
      if (resultado == "true") {
        result = true;
      } else {
        result = false;
      }
    },
  });

  return result;
};
