// -----------------------------------------------
//                      INICIO
// -----------------------------------------------
$(document).ready(() => {
    // console.log($("#inputBuscar").val());
    cargarTabla();
    // console.log($('#idEmpresa').val())
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
                          <input type="text" id="inputId" value="${fila["id"]}" readonly hidden>
                          
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
                              <textarea readonly  rows="5" cols="55" > ${ fila["observaciones"] || "" }"</textarea>
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
        // const botonEliminar = $("<img src='../../icon/borrar.png'>").on(
        //     "click",
        //     () => {
        //       Swal.fire({
        //         title: "¿Está seguro de eliminar?",
        //         text: "Está a punto de eliminar un informe.",
        //         icon: "warning",
        //         showCancelButton: true,
        //         confirmButtonColor: "#3085d6",
        //         cancelButtonColor: "#d33",
        //         confirmButtonText: "Confirmar, Eliminar informe!",
        //       }).then((result) => {
        //         if (result.isConfirmed) {
        //           eliminarConsulta(fila["id"])
        //             .then(() => {
        //               Swal.fire({
        //                 title: "Se eliminó correctamente!",
        //                 text: "El informe fue eliminada.",
        //                 icon: "success",
        //               });
        //               cargarTabla(); // Recargar la tabla con los datos actualizados
        //             })
        //             .catch(() => {
        //               Swal.fire({
        //                 icon: "error",
        //                 title: "Oops...",
        //                 text: "Ocurrió un error al eliminar informe",
        //               });
        //             });
        //         }
        //       });
        //     }
        //   );
        //   tr.append($("<td>").append(botonEliminar));
  
          $("tbody").append(tr);
        });
      },
    });
    trigger();
  };
  
  //Abre y cierra el modal
  const modalOnOff = () => {
    if ($("#contenedorModal").hasClass("on")) {
      $("#contenedorModal").attr("class", "contenedor-modal off");
      $("table").attr("class", "desbloqueado");
      $("#secMenu").attr("class", "secMenu desbloqueado");
      $("header").attr("class", "desbloqueado");
    } else {
      $("#contenedorModal").attr("class", "contenedor-modal on");
      $("table").attr("class", "bloqueado");
      $("#secMenu").attr("class", "secMenu bloqueado");
      $("header").attr("class", "bloqueado");
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
  
        console.log(response);
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

  
  function trigger () {
    $("#inputBuscar").trigger("click");
  }
    
    // Cuando el usuario haga click sobre el input
    $("#inputBuscar").on("click", function () {
        const buscarTexto = $(this).val().toLowerCase(); // Obtiene el texto a buscar en minúsculas
        filtrarTabla(buscarTexto);  // Ejecuta el filtrado
    });

  function filtrarTabla(buscarTexto) {
      $("table tbody tr").filter(function () {
          const dni = $(this).find("td:nth-child(2)").text().toLowerCase(); // Cambia 2 por el índice de la columna a filtrar
          // Compara si el valor de la celda de la columna "DNI" empieza con el texto buscado
          $(this).toggle(dni.startsWith(buscarTexto));  // Muestra u oculta la fila
      });
  }

    
  /*

  $(document).ready(function () {
    const filtrarTabla = () => {
        const buscarTexto = $("#inputBuscar").val().toLowerCase(); // Obtiene el texto a buscar en minúsculas

        // Filtra las filas de la tabla solo en la columna correspondiente
        $("table tbody tr").filter(function () {
            const dni = $(this).find("td:nth-child(2)").text().toLowerCase(); // Cambia 2 por el índice correcto de la columna
            // Compara si el contenido de la celda comienza con el texto buscado
            $(this).toggle(dni.startsWith(buscarTexto));
        });
    };

    // Ejecuta el filtrado automáticamente al cargar el documento
    filtrarTabla();

    // Escucha el evento `keyup` para actualizar la tabla en tiempo real
    $("#inputBuscar").on("keyup", function () {
        filtrarTabla();
    });
});

*/
  
  //------------------------------------------------------------------
  //                  BOTONES
  //------------------------------------------------------------------
  $("#btmCerrarSesion").one("click", () => {
    alertaCerrarSistema();
  });
  
  $("#btn-modal-X").click(() => {
    modalOnOff();
});
  
// $(document).on("click", "#enviarInforme", function () {
//     idE = $("#inputId").val();
//     enviarCorreoInforme(idE);
// });
