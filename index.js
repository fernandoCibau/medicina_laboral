$("#enviarCorreo").click(() => {
  e.preventDefault();
  alert("Holaa");
});

$("#formContacto").submit((e) => {
  e.preventDefault();
  let form = $("#formContacto");
  let formData = new FormData(form[0]);
  $.ajax({
    url: "enviarCorreoContacto.php",
    method: "post",
    data: formData,
    contentType: false,
    processData: false,

    success: (resultado, estado) => {
      try {
        let datos = JSON.parse(resultado);
        alert(datos.mensa);
      } catch (error) {
        console.log(resultado);
        console.error("Error en la autenticacion de los datos:", error);
        alert(
          "Error en la autenticacion de datos. Consulta la consola para más detalles."
        );
      }
    },
  });
});
