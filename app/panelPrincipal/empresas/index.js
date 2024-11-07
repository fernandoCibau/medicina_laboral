// -----------------------------------------------
//                      INICIO
// -----------------------------------------------
$(document).ready(() => {
  cargarTabla();
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

const cargarTabla = () => {
  $.ajax({
    url: "cargarTabla.php",
    method: "get",
    data: { todos: "todos" },

    success: (resultado, estado) => {
      let datos = JSON.parse(resultado);
      console.log(datos);

      // Vaciar el contenido de la tabla antes de agregar nuevas filas
      $("tbody").empty();

      const datosMap = datos.datos.map((item) => ({
        razon_social: item.razon_social,
        cuit: item.cuit,
        domicilio: item.domicilio,
        email: item.email,
        id: item.id,
      }));

      datosMap.forEach((fila) => {
        const tr = $("<tr>");

        // Crear una celda para cada campo excepto el ID
        for (let key in fila) {
          if (key !== "id") {
            const td = $("<td>").text(fila[key]);
            tr.append(td);
          }
        }

        // Botón Ver Empleados
        const botonVer = $("<img src='../../icon/ojo.png'>").on("click", () => {
          empleadosDeEmpresa(fila["id"]);
        });
        tr.append($("<td>").append(botonVer));

        // Botón Modificar Empresa
        const botonModificar = $("<img src='../../icon/editar.png'>").on(
          "click",
          () => {
            $("#contenedorDatos").empty();

            // Crear los inputs con los valores de la fila seleccionada
            $("#contenedorDatos").append(`
                        <input type="text" id="inputId" value="${fila["id"]}" readonly hidden>
                        
                        <div class="contenedor-input"> 
                          <label for="inputRazonSocial">Razón Social</label>
                          <input type="text" id="inputRazonSocial" value="${fila["razon_social"]}">
                        </div>
                        <div class="contenedor-input">   
                          <label for="inputCuit">CUIT</label>
                          <input type="text" id="inputCuit" value="${fila["cuit"]}">
                        </div>
                        <div class="contenedor-input"> 
                          <label for="inputDomicilio">Domicilio</label>
                          <input type="text" id="inputDomicilio" value="${fila["domicilio"]}">
                        </div>
                        <div class="contenedor-input"> 
                          <label for="inputEmail">Email</label>
                          <input type="text" id="inputEmail" value="${fila["email"]}">
                        </div>
                        <div id="modalButtons">
                            <button id="guardarCambiosBtn" class="btn btn-primary">Modificar</button>
                            <button id="cancelarBtn" class="btn btn-secondary">Cancelar</button>
                        </div>
                    `);

            $("#tituloModal").text("Modificar Empresa");
            modalOnOff();

            // Evento del botón Guardar Cambios
            $("#guardarCambiosBtn").on("click", () => {
              const datosActualizados = {
                id: $("#inputId").val(),
                razon_social: $("#inputRazonSocial").val(),
                cuit: $("#inputCuit").val(),
                domicilio: $("#inputDomicilio").val(),
                email: $("#inputEmail").val(),
              };

              $.ajax({
                url: "modificacionEmpresa.php",
                method: "POST",
                data: datosActualizados,
                success: (response) => {
                  const resultado = JSON.parse(response);
                  if (resultado.operacion) {
                    Swal.fire({
                      title: "Empresa modificada",
                      text: "Los cambios fueron guardados con éxito.",
                      icon: "success",
                    }).then(() => {
                      modalOnOff(); // Cerrar modal
                      cargarTabla(); // Recargar la tabla con los datos actualizados
                    });
                  } else {
                    Swal.fire("Error", resultado.mensaje, "error");
                  }
                },
                error: (xhr, status, error) => {
                  console.error("Error en la solicitud AJAX:", error);
                  Swal.fire(
                    "Error",
                    "Ocurrió un problema al guardar los cambios.",
                    "error"
                  );
                },
              });
            });

            // Evento del botón Cancelar
            $("#cancelarBtn").on("click", () => {
              modalOnOff(); // Cerrar el modal sin guardar
            });
          }
        );
        tr.append($("<td>").append(botonModificar));

        // Botón Eliminar Empresa
        const botonEliminar = $("<img src='../../icon/borrar.png'>").on(
          "click",
          () => {
            Swal.fire({
              title: "¿Está seguro de eliminar?",
              text: "Está a punto de eliminar la empresa.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Confirmar, Eliminar la empresa!",
            }).then((result) => {
              if (result.isConfirmed) {
                eliminarEmpresa(fila["id"])
                  .then(() => {
                    Swal.fire({
                      title: "Se eliminó correctamente!",
                      text: "La empresa fue eliminada.",
                      icon: "success",
                    });
                    cargarTabla(); // Recargar la tabla con los datos actualizados
                  })
                  .catch(() => {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Ocurrió un error al eliminar la empresa",
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

//Consulta de datos completos de la empresa
const empleadosDeEmpresa = (idEmpresa) => {
  $.ajax({
    url: "empleadosDeEmpresa.php",
    method: "get",
    data: { idEmpresa: idEmpresa },

    success: (resultado, estado) => {
      try {
        const datos = JSON.parse(resultado);

        modalOnOff();
        const tabla = $("<table>").attr("class", "tabla-empleados");
        const tr = $("<tr>");

        /* Carga el thead */
        for (key in datos.datos[0]) {
          tr.append($("<th>").text(key));
        }
        const thead = $("<thead>").append(tr);

        const tbody = $("<tbody>");
        // //Carga el tbody
        datos.datos.forEach((fila) => {
          const tr = $("<tr>");
          for (key in fila) {
            tr.append($("<td>").text(fila[key]));
          }
          tbody.append(tr);
        });

        $("#tituloModal").text("Empleados");
        tabla.append(thead, tbody);
        $("#contenedorDatos").empty().append(tabla);

        console.log(datos);
      } catch (error) {
        console.log(resultado);
        console.error("Error en la carga de empleados:", error);
        alert(
          "Error en la carga de datos. Consulta la consola para más detalles."
        );
      }
    },
  });
};

const eliminarEmpresa = (idEmpresa) => {
  return $.ajax({
    url: "bajaEmpresa.php",
    type: "POST",
    data: { id: idEmpresa },
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

//Buscador

$(document).ready(function () {
  $("#inputBuscar").on("keyup", function () {
    const buscarTexto = $(this).val().toLowerCase(); // Obtiene el texto a buscar en minúsculas

    // Filtra las filas de la tabla solo en la columna "Nombre"
    $("table tbody tr").filter(function () {
      const dni = $(this).find("td:nth-child(1)").text().toLowerCase(); // Cambia 3 por el índice de la columna "Nombre"
      // Compara si el nombre de la empresa comienza con el texto buscado
      $(this).toggle(dni.startsWith(buscarTexto));
    });
  });
});

//Funcion de agregar empresa

const botonAgregar = $("#agregarEmpresas").on("click", () => {
  $("#contenedorDatos").empty();

  // Crear los inputs con los valores de la fila seleccionada
  $("#contenedorDatos").append(`
                <div class="contenedor-input">  
                  <label for="inputRazonSocial">Razón Social</label>
                  <input type="text" id="inputRazonSocial">
                </div>
                <div class="contenedor-input">
                  <label for="inputCuit">CUIT</label>
                  <input type="text" id="inputCuit" maxlength="13" placeholder="xx-xxxxxxxx-x">
                </div>  
                <div class="contenedor-input">
                  <label for="inputDomicilio">Domicilio</label>
                  <input type="text" id="inputDomicilio">
                </div>
                <div class="contenedor-input">
                  <label for="inputEmail">Email</label>
                  <input type="text" id="inputEmail">
                </div>
                <div id="modalButtons">
                    <button id="agregarBtn" class="btn btn-primary">Agregar</button>
                    <button id="cancelarBtn" class="btn btn-secondary">Cancelar</button>
                </div>
            `);

  $("#tituloModal").text("Agregar Empresa");
  modalOnOff();

  // Evento del botón Guardar Cambios
  $("#agregarBtn").on("click", () => {
    const datosActualizados = {
      razon_social: $("#inputRazonSocial").val(),
      cuit: $("#inputCuit").val(),
      domicilio: $("#inputDomicilio").val(),
      email: $("#inputEmail").val(),
    };

    $.ajax({
      url: "altaEmpresa.php",
      method: "POST",
      data: datosActualizados,
      success: (response) => {
        const resultado = JSON.parse(response);
        if (resultado.operacion) {
          Swal.fire({
            title: "Empresa Agregada.",
            text: "Los empresa fue agregada con éxito.",
            icon: "success",
          }).then(() => {
            modalOnOff(); // Cerrar modal
            cargarTabla(); // Recargar la tabla con los datos actualizados
          });
        } else {
          Swal.fire("Error", resultado.mensaje, "error");
        }
      },
      error: (xhr, status, error) => {
        console.error("Error en la solicitud AJAX:", error);
        Swal.fire(
          "Error",
          "Ocurrió un problema al guardar los cambios.",
          "error"
        );
      },
    });
  });

  // Evento del botón Cancelar
  $("#cancelarBtn").on("click", () => {
    modalOnOff(); // Cerrar el modal sin guardar
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

$("#btn-modal-X").click(() => {
  modalOnOff();
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
