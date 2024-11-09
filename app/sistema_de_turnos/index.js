// -----------------------------------------------
//                      INICIO
// -----------------------------------------------
$(document).ready(() => {
  eliminarAutomatico();
  setFechaActual();
  matrizMes();
  window.isDevelopment =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";
});

// -----------------------------------------------
//                 FUNCIONES
// -----------------------------------------------

const erroresSoloLocalHost = (error) => {
  window.isDevelopment = true ? console.log(error) : "";
};

////Consulta la cantidad de turnos en la BD
const consultaCantidadDeTurnos = (anioYMes, cantidadDeDias) => {
  $.ajax({
    url: "consultaTurnos.php",
    method: "get",
    data: { anioYMes: anioYMes, cantidadDeDias: cantidadDeDias },

        success: (resultado, estado) => {
            try {
                
                const listaDeTurnos = JSON.parse(resultado);
                
                ////Agrega la cantidad de turnos en la fecha calendario
                for (let i = 0; i < listaDeTurnos.length; i++) {
                    
                    if( listaDeTurnos[i].turnos != 0 ){
                        const div = $("<div>").attr("class", "contenedor-numero-turnos");
                        const p = $("<p>");
                        p.append(listaDeTurnos[i].turnos);
                        div.append(p);
                        const id = $(`#${anioYMes}-${i+1}`).attr("id");
                        $(`#${id}`).append(div);
                    }
                }
            } catch (e) {
                alert('Ocurrió un error al procesar la respuesta del servidor.');
                const error = e.message + " | " + resultado;
                erroresSoloLocalHost( error )
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
            const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
            erroresSoloLocalHost( error );
        }

    });

};

// Establecer el valor del input de tipo month a la fecha actual
const setFechaActual = () => {
  const hoy = new Date();
  const año = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1);
  $("#mesInput").val(`${año}-${mes}`);
};

//Carga los turnos en el select de nuevo turno y bloquea los ya asignados
const buscarHorariosTurnos = (fecha) => {
  $.ajax({
    url: "buscarHorarios.php",
    method: "get",
    data: { fecha: fecha },

    success: (resultado, estado) => {
      try {
        const datos = JSON.parse(resultado);
        // console.log(datos.datos);
        $("#horas-del-dia").empty();

        $("#horas-del-dia").append($(`<option value=''>-- : -- : --</option>`));

        for (let i = 0; i < 24; i++) {
          // Solo dos iteraciones para 0 y 30 minutos
          for (let j = 0; j <= 1; j++) {
            const minutos = j * 30; // 0 o 30 minutos
            const hora = `${i < 10 ? "0" : ""}${i}:${
              minutos < 10 ? "0" : ""
            }${minutos}:00`; // Formato correcto de hora

            let isDisabled = false;

            // Verificar si la hora está en los turnos
            datos.datos.forEach((turno) => {
              if (hora === turno["hora"]) {
                isDisabled = true; // Marcar como deshabilitada si coincide
              }
            });

            // Agregar la opción
            if (isDisabled) {
              $("#horas-del-dia").append(
                $(
                  `<option value="${hora}" class="disabled-option" disabled>${hora}</option>`
                )
              );
            } else {
              $("#horas-del-dia").append(
                $(`<option value="${hora}">${hora}</option>`)
              );
            }
          }
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

//Carga la matriz del mes con todos los dias del mes
const matrizMes = () => {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  let cont = 0;

  const anioYMes = $("#mesInput").val();
  const [anio, mes] = anioYMes.split("-");

  const cantidadDeDias = new Date(anio, mes, 0).getDate();
  const primerDiaMes = new Date(anio, mes - 1, 1).getDay();
  const diaActual = new Date().getDate();
  const mesActual = new Date().getMonth() + 1; // empieza en 0
  const anioActual = new Date().getFullYear();

  $("#mes").empty();

  //carga los nombres de los dias
  for (let i = 0; i < dias.length; i++) {
    const divDias = $("<div>").attr("class", "contenedor-nombre-dias");
    const pDia = $("<p>").append(dias[i]);
    divDias.append(pDia);
    $("#mes").append(divDias);
  }

  // carga los dias vacios
  for (let i = 0; i < primerDiaMes; i++) {
    let div = $("<div>").attr("class", "contenedor-dias");
    $("#mes").append(div);
  }

  // carga los dias validos
  for (let i = 0; i < cantidadDeDias; i++) {
    cont++;
    let id = String(anio) + "-" + String(mes) + "-" + String(cont);
    let div = $("<div>").attr("class", "contenedor-dias");
    div.attr("id", id);

    const p = $("<p>").text(cont);
    div.append(p);

    div.on("click", function () {
      cargarTablaTurnos(id);
      modalOnOff();
      $("#contenedor-fom").attr("class", "contenedor-fom off");
    });

    //marcador del dia actual
    if (cont == diaActual && mes == mesActual && anio == anioActual) {
      div.css("background-color", "rgba(0, 128, 0, 0.479)");

      //HAY QUE CHEQUEAR SI SE DEJA --------------------------------------------------------------------------
      div.hover(
        function () {
          // Mouse enter
          $(this).css("background-color", "rgba(0, 130, 0, 0.7)"); // otra manera de cargar datos en una etiqueta
        },
        function () {
          // Mouse leave
          $(this).css("background-color", "rgba(0, 120, 0, 0.479)");
        }
      );
    }

    $("#mes").append(div);
  }

  consultaCantidadDeTurnos(anioYMes, cantidadDeDias);
};

//Carga los turnos en la tabla del modal
const cargarTablaTurnos = (idDelDia) => {
  $.ajax({
    url: "cargarTurno.php",
    method: "get",
    data: { idDelDia: idDelDia },

    success: (resultado, estado) => {
      try {
        let datos = JSON.parse(resultado);

        console.log(datos);

        $("tbody").empty();

        if (datos.datos.length == 0) {
          $("tbody").text("No se encontraron turnos en la fecha seleccionada.");
        }

        datos.datos.forEach((fila) => {
          const tr = $("<tr>");

          for (const key in fila) {
            tr.append($("<td>").text(fila[key]));
          }

          const botonEliminar = $(
            "<img src='icon/bote-de-basura.png' class='btn-eliminar id='btn-eliminar'>"
          ).click(() => {
            Swal.fire({
              title: "¿Está seguro de que desea eliminar?",
              showDenyButton: true,
              confirmButtonText: "Eliminar",
              denyButtonText: `No eliminar`,
            }).then((result) => {
              if (result.isConfirmed) {
                const fecha = fila["fecha"];
                const hora = fila["hora"];
                eliminarTurno(fecha, hora);
              } else if (result.isDenied) {
                alertInformar("Se ha cancelado la eliminacion");
              }
            });
          });

          tr.append($("<td>").append(botonEliminar));

                    $('tbody').append(tr);
                });
                
            } catch (e) {
                alert('Ocurrió un error al procesar la respuesta del servidor.');
                const error = e.message + " | " + resultado;
                erroresSoloLocalHost( error )
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
            const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
            erroresSoloLocalHost( error );
        }
    })
};

const modalOnOff = () => {
  if ($("#seccion-modal").hasClass("on")) {
    $("#seccion-modal").attr("class", "seccion-modal off");
    $("#seccion-mes").attr("class", "seccion-mes desbloqueado");
  } else {
    $("#seccion-modal").attr("class", "seccion-modal on");
    $("#seccion-mes").attr("class", "seccion-mes bloqueado");
  }
};

//Guardar el turno en la base de datos
const guardarNuevoTurno = (formData) => {
  $.ajax({
    url: "guardarTurno.php",
    method: "post",
    data: formData,
    contentType: false,
    processData: false,

    success: (resultado, estado) => {
      try {
        let datos = JSON.parse(resultado);

                console.log(datos)

                datos.operacion  ?     Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: datos.mensaje,
                    showConfirmButton: false,
                    timer: 1500
                }) 
                :  Swal.fire(datos.mensaje);
                matrizMes();
                
            } catch (e) {
                alert('Ocurrió un error al procesar la respuesta del servidor.');
                const error = e.message + " | " + resultado;
                erroresSoloLocalHost( error )
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
            const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
            erroresSoloLocalHost( error );
        }
    })
};

//Eliminar turno
const eliminarTurno = (fecha, hora) => {
  $.ajax({
    url: "eliminarTurno.php",
    method: "get",
    data: { fecha: fecha, hora: hora },

    success: (resultado, estado) => {
      try {
        const datos = JSON.parse(resultado);
        // console.log(datos);

                Swal.fire(datos.mensaje)
                cargarTablaTurnos(fecha);
                matrizMes();
                
            }catch (error) {
                alert("Error al eliminar el turno.");
                console.error("Error al eliminar el turno:", error);
            }
        }
    });
};

//Eliminar automatico de  turnos
const eliminarAutomatico = () => {
  $.ajax({
    url: "eliminarAuto.php",
    method: "get",
    data: { dato: "" },

        success:( resultado, status)=>{

            try {
                const datos = JSON.parse(resultado);
                console.log(datos);
            } catch (e) {
                alert('Ocurrió un error al procesar la respuesta del servidor.');
                const error = e.message + " | " + resultado;
                erroresSoloLocalHost( error )
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
            const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
            erroresSoloLocalHost( error );
        }
    });
};

//Cargar el select empresa del modal turnos
const cargarSelectEmpresa = ( idEmpresa =0 ) =>{
    $.ajax({
        url : "cargarSelectEmpresa.php",
        method : "get",
        data : {idEmpresa : idEmpresa },

        success:( resultado, estado )=>{

            try {
                const datos = JSON.parse(resultado);
                console.log(datos.datos);
                
                $('#selectEmpresas').empty().append( $('<option value="" selected>Selecciona una empresa</option>'));

                $('#selectEmpleados').prop('disabled', true).append($('<option value="" selected>Selecciona un empleado</option>') );
                
                datos.datos.forEach( fila => {            
                    $('#selectEmpresas').append( $( `<option value="${fila['id']}">${fila['razon_social']}</option>`) );
                });

            } catch (e) {
                alert('Ocurrió un error al procesar la respuesta del servidor.');
                const error = e.message + " | " + resultado;
                erroresSoloLocalHost( error )
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
            const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
            erroresSoloLocalHost( error );
        }
    })
}

//Cargar el select empleados del modal turnos
const cargarSelectEmpleados = ( idEmpresa = 0  ) =>{
    if ($('#selectEmpresas').val() === "") {
        $('#selectEmpleados').prop('disabled', true).append($('<option value="" selected>Selecciona un empleado</option>') );
    }else{
        $('#selectEmpleados').empty().prop('disabled', false).append($('<option value="" selected>Selecciona un empleado</option>') );

        $.ajax({
        url : "cargarSelectEmpleados.php",
        method : "get",
        data : {idEmpresa : idEmpresa },
        
        success:( resultado, estado )=>{

            try {
                const datos = JSON.parse(resultado);
                console.log(datos.datos);
                
                datos.datos.forEach( fila => {
                    $('#selectEmpleados').append( $( `<option value="${fila['id']}">${fila['nombre']} ${fila['apellido']}</option>`) );
                });
            
            } catch (e) {
                alert('Ocurrió un error al procesar la respuesta del servidor.');
                const error = e.message + " | " + resultado;
                erroresSoloLocalHost( error )
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
            const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
            erroresSoloLocalHost( error );
        }})
    }
}

//Cargar el select medicos del modal turnos
const cargarSelectMedicos = () => {
  $("#selectMedicos")
    .empty()
    .append($('<option value="" selected>Selecciona un medico</option>'));

    $.ajax({
        url : "cargarSelectMedicos.php",
        method : "get",
        data : {medicos : 'medicos' },
        
        success:( resultado, estado )=>{

            try {
                const datos = JSON.parse(resultado);
                console.log(datos.datos);
                
                datos.datos.forEach( fila => {
                    $('#selectMedicos').append( $( `<option value="${fila['id']}"> ${fila['nombre']} </option>`) );
                });
                
            } catch (e) {
                alert('Ocurrió un error al procesar la respuesta del servidor.');
                const error = e.message + " | " + resultado;
                erroresSoloLocalHost( error );
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
            const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
            erroresSoloLocalHost( error );
        }
    })
}

//Valida los input del modal nuevo turno para desbloquear boton
const validarInputTurnos = ( ) =>{

    if($('#selectEmpresas').val() == "" || $('#fecha').val() === "" || $('#selectEmpleados').val()  == "" || $('#horas-del-dia').val() == "" || $('#selectMedicos').val() == ""){
        $('#btnAgregarTurno').prop('disabled', true);
        $('#btnAgregarTurno').attr('class', 'btn-color-bloqueado');
    }else{
        $('#btnAgregarTurno').prop('disabled', false);
        $('#btnAgregarTurno').attr('class', 'btnAgregarTurno');
    }
}

// -----------------------------------------------
//     BOTONES Y FORMULARIOS
// -----------------------------------------------

//Carga los datos del nuevo mes
$("#btn-buscar").click(() => {
  matrizMes();
});

//Boton para abrir modal nuevo turno
$("#btn-nuevo-turno").click(() => {
  modalOnOff();
  $("#contenedor-tabla").attr("class", "contenedor-tabla off");
  cargarSelectEmpresa();
  cargarSelectMedicos();
  validarInputTurnos();
});

//Boton para cerrar modal
$("#btn-cerrar").click(() => {
  modalOnOff();
  $("#contenedor-tabla").attr("class", "contenedor-tabla on");
  $("#contenedor-fom").attr("class", "contenedor-fom on");
});

//Boton del formulario de turnos
$("#form-nuevo-turno").submit( e =>{
    e.preventDefault();
    const form =  $("#form-nuevo-turno")[0];
    
    let formData = new FormData(form);
    
    guardarNuevoTurno( formData );
});

//Select empresas del modal nuevo turno
$("#selectEmpresas").on("input", () => {
  cargarSelectEmpleados($("#selectEmpresas").val());
});

//Select fecha del modal nuevo turno
$("#fecha").on("input", () => {
  buscarHorariosTurnos($("#fecha").val());
});

$('#form-nuevo-turno').on( 'input', ()=>{
    validarInputTurnos();
}) 


//-----------------------------------------------
//      Cierra la sesion 
//-----------------------------------------------
//Cierra la sesion de usuario
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
        confirmButtonText: "Confirmar!"
    }).then((result) => {
        if (  result.isConfirmed    ) {
        cerrarCuentaRegresiva()
        }
    });
});

//Cuenta regresiva Cerrar sesion
const cerrarCuentaRegresiva = ()=>{
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
    }
    }).then((result) => {
      /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
        window.location.href = "../cerrarSesion.php";
        }
    });
}
