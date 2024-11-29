// -----------------------------------------------
//                      INICIO
// -----------------------------------------------
$(document).ready(() => {
  const idEmpresa = 0;
  cargarTabla(idEmpresa);
});

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

const cargarTabla = (idEmpresa = 0) => {
  $.ajax({
    url: "cargarTabla.php",
    method: "get",
    data: { idEmpresa: idEmpresa },

    success: (resultado, estado) => {
      let datos = JSON.parse(resultado);
      console.log(datos);

      // Vaciar el contenido de la tabla antes de agregar nuevas filas
      $("tbody").empty();

      const datosMap = datos.datos.map((item) => ({
        id: item.consulta_id, // ID de la consulta médica
        empleado_apellido: item.empleado_apellido, // Apellido del empleado
        empresa_razon_social: item.empresa_razon_social, // Razón social de la empresa
        fecha: item.fecha, // Fecha de la consulta
        diagnostico_cie10: item.diagnostico_cie10, // Diagnóstico
        solicitud_ausentismo: item.solicitud_ausentismo, // Tipo de solicitud de ausentismo
        fecha_inicio_ausentismo: item.fecha_inicio_ausentismo, // Fecha de inicio del ausentismo
        fecha_fin_ausentismo: item.fecha_fin_ausentismo, // Fecha de fin del ausentismo
        id_empleado: item.id_empleado, // ID del empleado asociado a la consulta
        medico_certificado: item.medico_certificado, // Certificado del médico
        observaciones: item.observaciones, // Observaciones (si existen)
        empleado_nombre: item.empleado_nombre, // Nombre del empleado
      }));

      datosMap.forEach((fila) => {
        const tr = $("<tr>");

        // Crear una celda para cada campo excepto el ID
        for (let key in fila) {
          if (
            key !== "id" &&
            key !== "medico_certificado" &&
            key !== "observaciones" &&
            key !== "empleado_nombre" &&
            key !== "id_empleado"
          ) {
            const td = $("<td>").text(fila[key]);
            tr.append(td);
          }
        }

        // Botón Ver Informe Completo
        const botonVer = $("<img src='../../icon/ojo.png'>").on("click", () => {
          $("#contenedorDatos").empty();

          // Verificar que los datos de la fila están disponibles
          if (!fila) {
            console.error("Datos de la fila no disponibles.");
            return;
          }

          // Crear los inputs con los valores del objeto de datos seleccionado
          $("#contenedorDatos").append(`
                          <input type="text" id="inputId" value="${
                            fila["id"]
                          }" readonly hidden>
                          
                          <div class="contenedor-input">
                              <label for="inputRazonSocial">Empresa</label>
                              <input type="text" id="inputRazonSocial" value="${
                                fila["empresa_razon_social"]
                              }" readonly>
                          </div>
                          
                          <div class="contenedor-input">
                              <label for="inputEmpleadoNombre">Empleado</label>
                              <input type="text" id="inputEmpleadoNombre" value="${
                                fila["empleado_nombre"]
                              } ${fila["empleado_apellido"]}" readonly>
                          </div>

                          <div class="contenedor-input">
                              <label for="inputMedicoCertificado">Certificado Médico</label>
                              <input type="text" id="inputMedicoCertificado" value="${
                                fila["medico_certificado"]
                              }" readonly>
                          </div>

                          <div class="contenedor-input">
                              <label for="inputFechaConsulta">Fecha de la Consulta</label>
                              <input type="text" id="inputFechaConsulta" value="${
                                fila["fecha"]
                              }" readonly>
                          </div>

                          <div class="contenedor-input">
                              <label for="inputDiagnostico">Diagnóstico</label>
                              <input type="text" id="inputDiagnostico" value="${
                                fila["diagnostico_cie10"]
                              }" readonly>
                          </div>

                          <div class="contenedor-input">
                              <label for="inputSolicitudAusentismo">Solicitud de Ausentismo</label>
                              <input type="text" id="inputSolicitudAusentismo" value="${
                                fila["solicitud_ausentismo"]
                              }" readonly>
                          </div>

                          <div class="contenedor-input">
                              <label for="inputFechaInicioAusentismo">Fecha Inicio Ausentismo</label>
                              <input type="text" id="inputFechaInicioAusentismo" value="${
                                fila["fecha_inicio_ausentismo"]
                              }" readonly>
                          </div>

                          <div class="contenedor-input">
                              <label for="inputFechaFinAusentismo">Fecha Fin Ausentismo</label>
                              <input type="text" id="inputFechaFinAusentismo" value="${
                                fila["fecha_fin_ausentismo"]
                              }" readonly>
                          </div>

                          <div class="contenedor-input">
                              <label for="inputObservaciones">Observaciones</label>
                              <input type="text" id="inputObservaciones" value="${
                                fila["observaciones"] || ""
                              }" readonly>
                          </div>
                          
                          <div id="modalButtons">
                              <button id="enviarInforme" class="btn btn-primary">Enviar Informe</button>
                              <button id="cancelarBtn" class="btn btn-secondary">Cancelar</button>
                          </div>
                    `);

          $("#tituloModal").text("Informe Medico");
          modalOnOff();
          $("#cancelarBtn").on("click", () => {
            modalOnOff(); // Cerrar el modal sin guardar
          });
        });

        // Añadir el botón a la fila de la tabla
        tr.append($("<td>").append(botonVer));

        // Botón Eliminar Empresa
        const botonEliminar = $("<img src='../../icon/borrar.png'>").on(
          "click",
          () => {
            Swal.fire({
              title: "¿Está seguro de eliminar?",
              text: "Está a punto de eliminar un informe.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Confirmar, Eliminar informe!",
            }).then((result) => {
              if (result.isConfirmed) {
                eliminarConsulta(fila["id"])
                  .then(() => {
                    Swal.fire({
                      title: "Se eliminó correctamente!",
                      text: "El informe fue eliminada.",
                      icon: "success",
                    });
                    cargarTabla(); // Recargar la tabla con los datos actualizados
                  })
                  .catch(() => {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Ocurrió un error al eliminar informe",
                    });
                  });
              }
            });
          }
        );
        tr.append($("<td>").append(botonEliminar));

        $("tbody").append(tr);
      });
    },
  });
};

//Abre y cierra el modal
const modalOnOff = () => {
  const mainContent = document.querySelector("main");
  if ($("#contenedorModal").hasClass("on")) {
    $("#contenedorModal").attr("class", "contenedor-modal off");
    mainContent.classList.remove("blur-background");
  } else {
    $("#contenedorModal").attr("class", "contenedor-modal on");
    mainContent.classList.add("blur-background");
  }
};

const eliminarConsulta = (idConsulta) => {
  return $.ajax({
    url: "bajaConsulta.php", // Asegúrate de ajustar la ruta correctamente
    type: "POST",
    data: { id: idConsulta },
    dataType: "json",
    success: function (response) {
      if (response.operacion) {
        return true; // Se usará en el bloque .then() de la promesa en la función principal
      } else {
        console.error("Error en el servidor:", response.mensaje);
        return false;
      }
    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud AJAX:", error);
      return false;
    },
  });
};

const enviarCorreoInforme = (idCon) => {
  $.ajax({
    url: "enviarinforme.php", // Asegúrate de ajustar la ruta correctamente
    type: "POST",
    data: { id: idCon },
    dataType: false,
    success: function (response) {
      // let datos = JSON.parse(response);
      //let datos2 = JSON.stringify(datos.datos);
      let datos = JSON.parse(response);
      console.log(datos);
      alert(datos.mensaje);
      /* if (response.operacion) {
        console.log(response.datos);
        console.log(response.filas);
      } else {
        console.error("Error en el servidor:", response.mensaje);
        return false;
      }
    */
    },
    error: function (xhr, status, error) {
      console.error("Error en la solicitud AJAX:", error);
      return false;
    },
  });
};

//Buscador

$(document).ready(function () {
  $("#inputBuscar").on("keyup", function () {
    const buscarTexto = $(this).val().toLowerCase(); // Obtiene el texto a buscar en minúsculas

    // Filtra las filas de la tabla solo en la columna "Nombre"
    $("table tbody tr").filter(function () {
      const dni = $(this).find("td:nth-child(2)").text().toLowerCase(); // Cambia 3 por el índice de la columna "Nombre"
      // Compara si el nombre de la empresa comienza con el texto buscado
      $(this).toggle(dni.startsWith(buscarTexto));
    });
  });
});

//------------------------------------------------------------------
//                  BOTONES
//------------------------------------------------------------------
$("#btmCerrarSesion").one("click", () => {
  alertaCerrarSistema();
});

$("#btn-modal-X").click(() => {
  modalOnOff();
});

$(document).on("click", "#enviarInforme", function () {
  idE = $("#inputId").val();
  enviarCorreoInforme(idE);
});

// const contenedorLista = $("<div>").attr('class', 'contendor-lista');

//                     const divRazon_social = $("<div>").attr('class', 'contenedor-item');
//                     const divCuit = $('<div>').attr('class', 'contenedor-item');
//                     const divDomicilio = $('<div>').attr('class', 'contenedor-item');
//                     const divTelefono = $('<div>').attr('class', 'contenedor-item');
//                     const divEmail = $('<div>').attr('class', 'contenedor-item');

//                     // Agregar contenido a cada div
//                     divRazon_social.append($("<span>Razón Social: </span>"), $(`<span>${ fila['razon_social']}</span>`));
//                     divCuit.append($("<span>CUIT: </span>"), $(`<span>${ fila['cuit']}</span>`));
//                     divDomicilio.append($("<span>Domicilio: </span>"), $(`<span>${ fila['domicilio']}</span>`));
//                     divTelefono.append($("<span>Teléfono: </span>"), $(`<span>${ fila['telefono']}</span>`));
//                     divEmail.append($("<span>Email: </span>"), $(`<span>${ fila['email']}</span>`));

//                     // Agregar todos los divs al contenedor de la lista
//                     contenedorLista.append(divRazon_social, divCuit, divDomicilio, divTelefono, divEmail);

//                     // Limpiar el contenido anterior y agregar el nuevo
//                     $("#contenedorDatos").empty().append(contenedorLista);
