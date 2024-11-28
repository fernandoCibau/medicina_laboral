// -----------------------------------------------
//                      INICIO
// -----------------------------------------------
$(document).ready(() => {
  cargarTabla();
  window.isDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
});

//------------------------------------------------------------------
//          BOTON NUEVO DOCTOR
//------------------------------------------------------------------

$("#btnNuevoDoctor").click(() => {
  modalOnOff();
  nuevoDoctor();
});

const nuevoDoctor = () => {
  $("#contenedorDatos").empty();

  $("#tituloModal").text("Alta Médico");

  const form = $(
    `<form action=""method="post" id="formAlta" class="formulario"></form>`
  );

  form.append(
    $(`
        <div class="contenedor-input">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre" required>
        </div>

        <div class="contenedor-input">
            <label for="especialidad">Especialidad</label>
            <input type="text" name="especialidad" required>
        </div>

        <div class="contenedor-input">
            <label for="matricula">Matrícula</label>
            <input type="text" name="matricula" required>
        </div>

        <div class="contenedor-input">
            <label for="dni">DNI</label>
            <input type="text" name="dni" required>
        </div>

        <div class="contenedor-input">
            <label for="apellido">Apellido</label>
            <input type="text" name="apellido" required>
        </div>

        <div class="contenedor-input">
            <label for="email">Email</label>
            <input type="email" name="email" required>
        </div>

        <div class="contenedor-input">
            <label for="password">Contraseña</label>
            <input type="password" name="password" required>
        </div>

    `)
  );

  form.append(`
        <div id="modalButtons">
            <input type="submit" class="btn-primary" value="Enviar Alta">
            <input type="button" id="btnCancel" class="btn-secondary" value="Cancelar">
        </div>
    `);

  $("#contenedorDatos").append(form);

  $("#btnCancel").click(() => {
    modalOnOff();
  });

  $("#formAlta").submit((e) => {
    e.preventDefault();

    Swal.fire({
      title: "¿Confirmar Alta?",
      text: "Está a punto de dar de alta un nuevo medico.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar, Alta!",
    }).then((result) => {
      if (result.isConfirmed) {
        formAltaAjax();
      }
    });
  });
};

const formAltaAjax = () => {
  let form = $("#formAlta");
  let formData = new FormData(form[0]);

  $.ajax({
    url: "medicoAlta.php",
    method: "post",
    data: formData,
    contentType: false,
    processData: false,

    success: (resultado) => {
      try {
        const datos = JSON.parse(resultado);

        if (datos.operacion) {
          Swal.fire({
            title: "Se Agrego Un Nuevo Médico",
            text: "Los datos fueron guardados con éxito.",
            icon: "success",
          }).then(() => {
            modalOnOff();
            cargarTabla();
          });
        } else {
          Swal.fire("Error", datos.mensaje, "error");
          erroresSoloLocalHost(datos.error);
        }
      } catch (e) {
        modalOnOff();
        cargarTabla();
        //alert("Ocurrió un error al procesar la respuesta del servidor.");
        const error = e.message + " | " + resultado;
        erroresSoloLocalHost(error);
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      alert("Ocurrió un error en la solicitud. Intenta de nuevo más tarde.");
      const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
      erroresSoloLocalHost(error);
    },
  });
};

//------------------------------------------------------------------
//              TABLA Y SUS FUNCIONES
//------------------------------------------------------------------

const cargarTabla = () => {
  // spinner( false );
  $.ajax({
    url: "cargarTabla.php",
    method: "get",
    data: { todos: "todos" },

    success: (resultado, estado) => {
      // spinner( false );
      try {
        const datos = JSON.parse(resultado);

        // if( datos.operacion ){
        //     spinner( true );
        // }

        const datosMap = datos.datos.map((item) => ({
          nombre: item.nombre,
          apellido: item.apellido,
          especialidad: item.especialidad,
          matricula: item.matricula,
          dni: item.dni,
          email: item.email,
          id: item.id,
        }));

        $("tbody").empty();

        datosMap.forEach((fila) => {
          const tr = $("<tr>");

          for (let key in fila) {
            if (key !== "id") {
              tr.append($("<td>").text(fila[key]));
            }
          }

          //Boton Modificar
          tr.append(
            $("<td>").append(
              $("<img src='../../icon/editar.png'>").on("click", () => {
                modificarMedico(fila);
              })
            )
          );

          //Boton Eliminar
          tr.append(
            $("<td>").append(
              $("<img src='../../icon/borrar.png'>").on("click", () => {
                Swal.fire({
                  title: "¿Está seguro de eliminar?",
                  text: "Está a punto de eliminar un medico.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Confirmar, Eliminar al medico!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    eliminarDoctor(fila["id"]);
                  }
                });
              })
            )
          );

          $("tbody").append(tr);
        });
      } catch (e) {
        alert("Ocurrio un error.");
        console.log(e.message + " | " + resultado);
      }
    },
  });
};

const modificarMedico = (fila) => {
  modalOnOff();

  $("#contenedorDatos").empty();

  $("#tituloModal").text("Modificar Médico");

  const form = $(
    `<form action=""method="post" id="formModificar" class="formulario"></form>`
  );

  for (const key in fila) {
    if (key === "id") {
      form.append(
        $(`<input type="hidden" name="${key}" value="${fila[key]}" >`)
      );
    } else {
      form.append(
        $(`
                <div class="contenedor-input ">
                    <label for="${key}">${key}</label>
                    <input type="text" name="${key}" value="${fila[key]}" required">
                </div>
            `)
      );
    }
  }

  form.append(`
        <div id="modalButtons">
            <input type="submit" class="btn-primary" value="Modificar">
            <input type="button" id="btnCancel" class="btn-secondary" value="Cancelar">
        </div>
    `);

  $("#contenedorDatos").append(form);

  $("#btnCancel").click(() => {
    modalOnOff();
  });

  $("#formModificar").submit((e) => {
    e.preventDefault();
    formModificarAjax();
  });
};

const formModificarAjax = () => {
  let form = $("#formModificar");
  let formData = new FormData(form[0]);

  $.ajax({
    url: "medicoModificar.php",
    method: "POST",
    data: formData,
    contentType: false,
    processData: false,

    success: (resultado) => {
      try {
        const datos = JSON.parse(resultado);

        if (datos.operacion) {
          Swal.fire({
            title: "Médico modificado",
            text: "Los cambios fueron guardados con éxito.",
            icon: "success",
          }).then(() => {
            modalOnOff();
            cargarTabla();
          });
        } else {
          Swal.fire("Error", datos.mensaje, "error");
        }
      } catch (e) {
        alert("Ocurrió un error al procesar la respuesta del servidor.");
        const error = e.message + " | " + resultado;
        erroresSoloLocalHost(error);
      }
    },
    error: (jqXHR, textStatus, errorThrown) => {
      alert("Ocurrió un error en la solicitud. Intenta de nuevo más tarde.");
      const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
      erroresSoloLocalHost(error);
    },
  });
};

const eliminarDoctor = (idDoctor) => {
  $.ajax({
    url: "medicoBaja.php",
    type: "post",
    data: { idDoctor: idDoctor },

    success: function (resultado) {
      try {
        const datos = JSON.parse(resultado);

        if (datos.operacion) {
          Swal.fire({
            title: "Se eliminó correctamente!",
            text: "El medico fue eliminada.",
            icon: "success",
          });
          cargarTabla();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Ocurrió un error al eliminar  el medico",
          });
        }
      } catch (e) {
        alert("Ocurrio un error.");
        const error = e.message + " | " + resultado;
        erroresSoloLocalHost(error);
      }
    },
    error: function (xhr, status, error) {
      console.log("Error en la solicitud AJAX:", error);
      return false;
    },
  });
};

//------------------------------------------------------------------
//                  BOTONES
//------------------------------------------------------------------
// $("#btmCerrarSesion").one("click", () => {
//   if (confirm("¿Desea cerrar la sesión?")) {
//     window.location.href = "../../cerrarSesion.php";
//   }
// });

$("#btmCerrarSesion").click(() => {
  // if (confirm("¿Desea cerrar la sesión?")) {
  //   window.location.href = "../cerrarSesion.php";
  // }

  Swal.fire({
    title: "¿Está seguro de salir del sistema?",
    text: "Está a punto de cerrar sesión.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      cerrarCuentaRegresiva();
    }
  });
});

const cerrarCuentaRegresiva = () => {
  let timerInterval;
  Swal.fire({
    title: "Saliendo del sistama",
    html: "El sistema se está cerrando... <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      window.location.href = "../../cerrarSesion.php";
    }
  });
};

$("#btn-modal-X").click(() => {
  modalOnOff();
});

//------------------------------------------------------------------
//         BUSCADORES INPUTS TYPE TEXT
//------------------------------------------------------------------

$("#buscarPorNombre, #buscarPorEspecialidad").on("input", () => {
  const nombre = $("#buscarPorNombre").val();
  const especialidad = $("#buscarPorEspecialidad").val();

  if (nombre.length >= 1) {
    $("#buscarPorEspecialidad").val("");
    buscarMedico("nombre", nombre);
  } else if (especialidad.length >= 1) {
    $("#buscarPorNombre").val("");
    buscarMedico("especialidad", especialidad);
  } else {
    buscarMedico("todos", "todos");
  }
});

const buscarMedico = (buscarPor, caracteres) => {
  $.ajax({
    url: "buscarMedico.php",
    method: "get",
    data: {
      buscarPor: buscarPor,
      caracteres: caracteres,
    },

    success: (resultado, estado) => {
      try {
        const datos = JSON.parse(resultado);

        const datosMap = datos.datos.map((item) => ({
          nombre: item.nombre,
          apellido: item.apellido,
          especialidad: item.especialidad,
          matricula: item.matricula,
          dni: item.dni,
          email: item.email,
          id: item.id,
        }));
        console.log(datosMap);
        $("tbody").empty();

        datosMap.forEach((fila) => {
          const tr = $("<tr>");

          for (let key in fila) {
            if (key !== "id") {
              tr.append($("<td>").text(fila[key]));
            }
          }

          //Boton Modificar
          tr.append(
            $("<td>").append(
              $("<img src='../../icon/editar.png'>").on("click", () => {
                modificarMedico(fila);
              })
            )
          );

          //Boton Eliminar
          tr.append(
            $("<td>").append(
              $("<img src='../../icon/borrar.png'>").on("click", () => {
                Swal.fire({
                  title: "¿Está seguro de eliminar?",
                  text: "Está a punto de eliminar un medico.",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Confirmar, Eliminar al medico!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    eliminarDoctor(fila["id"]);
                  }
                });
              })
            )
          );

          $("tbody").append(tr);
        });
      } catch (e) {
        const error = e.message + " | " + resultado;
        erroresSoloLocalHost(error);
      }
    },
  });
};

//------------------------------------------------------------------
//              OTRAS FUNCIONES
//------------------------------------------------------------------

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

const erroresSoloLocalHost = (error) => {
  window.isDevelopment = true ? console.log(error) : "";
};

//FALTA TERMINAR XXXXXXXX
const spinner = (respuesta) => {
  const spinnerModal = $("<div class='spinner-modal' id='spinerModal'>");
  if (respuesta) {
    spinnerModal.append(`
            <div class="container">
                <div id="spinner" class="spinner">
                <div class="ecg-line">
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    <div class="line"></div>
                    </div>
                    </div>
            </div>
        `);

    $("main").append(spinnerModal);
  } else {
    $("spinerModal").attr("class", "spinner-off");
    alert("¡Carga completada!");
  }
};
