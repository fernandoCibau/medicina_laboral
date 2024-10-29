//------------------------------------------------------------------
//                  FORMULARIO
//------------------------------------------------------------------

$("#formContraseña").submit((e) => {
  e.preventDefault();
  let form = $("#formContraseña");
  let formData = new FormData(form[0]);
  $(".loader").removeClass("hidde");
  envioDeCorreo(formData);
  /* auntenticar(formData); */
});

$("#formActualizarContrasenia").submit((e) => {
  e.preventDefault();
  let form = $("#formActualizarContrasenia");
  let formData = new FormData(form[0]);
  $(".loader").removeClass("hidde");
  actuContra(formData);
  window.location.href = "../index.php";
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
      try {
        $("#mensaje").text(resultado);
        $("p").removeClass("hidde");
        $(".loader").addClass("hidde");
        $("p").addClass("show");
      } catch (error) {
        alert(error);
      }
    },
  });
};

let auntenticar = (formData) => {
  $.ajax({
    url: "auntenticacionCon.php",
    method: "post",
    data: formData,
    contentType: false,
    processData: false,
    success: (resultado, estado) => {
      try {
        alert(resultado);
      } catch (error) {
        alert(error);
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
      try {
        alert(resultado);
      } catch (error) {
        alert(error);
      }
    },
  });
};
