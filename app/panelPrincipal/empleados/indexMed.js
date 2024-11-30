// -----------------------------------------------
//                      INICIO
// -----------------------------------------------
$(document).ready(() => {
    cargarTabla( );
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
            id: item.id || "", // Manten el ID al principio si es importante
            empresa_nombre: item.empresa_nombre || "", // Nombre de la empresa
            legajo: item.legajo || "",
            dni: item.dni || "",
            apellido: item.apellido || "",
            nombre: item.nombre || "",
            domicilio: item.domicilio || "",
            fecha_nacimiento: item.fecha_nacimiento || "",
            fecha_ingreso: item.fecha_ingreso || "",
            observaciones: item.observaciones || "",
        }));

        datosMap.forEach((fila) => {
            const tr = $("<tr>");
            // Crear una celda para cada campo excepto el ID
            for (let key in fila) {
                if (
                key !== "id" &&
                key !== "fecha_nacimiento" &&
                key !== "fecha_ingreso" &&
                key !== "domicilio" &&
                key !== "observaciones"
                ) {
                const td = $("<td>").text(fila[key]);
                tr.append(td);
                }
            }
    
            // Botón Agregar Consulta
            const botonAgregar = $("<img src='../../icon/agregar.png'>").on(
                "click",
                () => {
                $("#contenedorDatos").empty();
    
                $("#contenedorDatos").append(`
                            <input type="text" id="inputId" value="${fila["id"]}" hidden>
    
                            <div class="contenedor-input">
                                <label for="inputFechaConsulta">Fecha</label>
                                <input type="date" id="inputFechaConsulta" required>
                            </div>
                                
                            <div class="contenedor-input">
                                <label for="inputMedicoCertificado">Medico que firma el certificado</label>
                                <input type="text" id="inputMedicoCertificado" required>
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputCie10">Diagnostico</label>
                                <input type="text" id="inputCie10" required>
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputSolicitudCertificado">Ingrese la indicacion de reposo del certificado</label>
                                <input type="text" id="inputSolicitudCertificado" required>
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputFechaInicio">Fecha de inicio de ausentismo justificado</label>
                                <input type="date" id="inputFechaInicio" required>
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputFechaFin">Fecha de fin de ausentismo justificado</label>
                                <input type="date" id="inputFechaFin" required>
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputObservaciones">Observaciones</label>
                                <input type="text" id="inputObservaciones" required>
                            </div>
                            
                            <div id="modalButtons">
                                <button id="guardarConsulta" class="btn btn-primary">Agregar consulta</button>
                                <button id="cancelarBtn" class="btn btn-secondary">Cancelar</button>
                            </div>
                        `);
                const today = new Date().toISOString().split("T")[0];
                $("#inputFechaConsulta").val(today);
    
                $("#tituloModal").text("Agregar consulta");
                modalOnOff();
                $("#cancelarBtn").on("click", () => {
                    modalOnOff(); // Cerrar el modal sin guardar
                });
                $("#guardarConsulta").on("click", () => {
                    const datosConsulta = {
                    //AGREGAR DATOS PARA ARMAR EL NUEVO REGISTRO DE CONSULTA
                    id_empleado: $("#inputId").val(),
                    fecha: $("#inputFechaConsulta").val(),
                    medico_certificado: $("#inputMedicoCertificado").val(),
                    diagnostico_cie10: $("#inputCie10").val(),
                    solicitud_ausentismo: $("#inputSolicitudCertificado").val(),
                    fecha_inicio_ausentismo: $("#inputFechaInicio").val(),
                    fecha_fin_ausentismo: $("#inputFechaFin").val(),
                    observaciones: $("#inputObservaciones").val(),
                    };
                    $.ajax({
                    url: "agregarConsulta.php",
                    method: "POST",
                    data: datosConsulta,
                    success: (response) => {
                        const resultado = JSON.parse(response);
                        if (resultado.operacion) {
                        Swal.fire({
                            title: "Consulta agregada",
                            text: "La consulta fue guardada con éxito.",
                            icon: "success",
                        }).then(() => {
                            modalOnOff(); // Cerrar modal
                        });
                        } else {
                        Swal.fire("Error", resultado.mensaje, "error");
                        }
                    },
                    error: (xhr, status, error) => {
                        console.error("Error en la solicitud AJAX:", error);
                        Swal.fire(
                        "Error",
                        "Ocurrió un problema al guardar la consulta.",
                        "error"
                        );
                    },
                    });
                });
                }
            );
            tr.append($("<td>").append(botonAgregar));
    
            // Botón Modificar Empleado
            const botonModificar = $("<img src='../../icon/editar.png'>").on(
                "click",
                () => {
                $("#contenedorDatos").empty();
    
                // Crear los inputs con los valores de la fila seleccionada
                $("#contenedorDatos").append(`
                            <input type="text" id="inputId" value="${fila["id"]}" hidden>
                            <div class="contenedor-input">
                                <label for="inputIdEmpresa">Empresa</label>
                                <input type= "number" id="idEmpresa" value = "${fila["id_empresa"]}" hidden>
                                <input type="text" id="inputIdEmpresa" value="${fila["empresa_nombre"]}" readonly>
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputLegajo">Legajo</label>
                                <input type="text" id="inputLegajo" value="${fila["legajo"]}">
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputDNI">DNI</label>
                                <input type="text" id="inputDNI" value="${fila["dni"]}">
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputApellido">Apellido</label>
                                <input type="text" id="inputApellido" value="${fila["apellido"]}">
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputNombre">Nombre</label>
                                <input type="text" id="inputNombre" value="${fila["nombre"]}">
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputDomicilio">Domicilio</label>
                                <input type="text" id="inputDomicilio" value="${fila["domicilio"]}">
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputFechaNac">Fecha Nac:</label>
                                <input type="date" id="inputFechaNac" value="${fila["fecha_nacimiento"]}">
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputFechaIng">Fecha Ing:</label>
                                <input type="date" id="inputFechaIng" value="${fila["fecha_ingreso"]}">
                            </div>
    
                            <div class="contenedor-input">
                                <label for="inputObservaciones">Observaciones</label>
                                <input type="text" id="inputObservaciones" value="${fila["observaciones"]}">
                            </div>
    
                            <div id="modalButtons">
                                <button id="guardarCambiosBtn" class="btn btn-primary">Modificar</button>
                                <button id="cancelarBtn" class="btn btn-secondary">Cancelar</button>
                            </div>
                        `);
    
                $("#tituloModal").text("Modificar Empleado");
                modalOnOff();
    
                // Evento del botón Guardar Cambios
                $("#guardarCambiosBtn").on("click", () => {
                    const datosActualizados = {
                    id: $("#inputId").val(),
                    legajo: $("#inputLegajo").val(),
                    dni: $("#inputDNI").val(),
                    nombre: $("#inputNombre").val(),
                    apellido: $("#inputApellido").val(),
                    domicilio: $("#inputDomicilio").val(),
                    fecha_nacimiento: $("#inputFechaNac").val(),
                    fecha_ingreso: $("#inputFechaIng").val(),
                    observaciones: $("#inputObservaciones").val(),
                    id_empresa: $("#idEmpresa").val(),
                    };
    
                    $.ajax({
                    url: "modificacionEmpleado.php",
                    method: "POST",
                    data: datosActualizados,
                    success: (response) => {
                        const resultado = JSON.parse(response);
                        if (resultado.operacion) {
                        Swal.fire({
                            title: "Empleado modificado",
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
                    $("#contenedorDatos").empty();
                    modalOnOff(); // Cerrar el modal sin guardar
                });
                }
            );
            tr.append($("<td>").append(botonModificar));

                $("tbody").append(tr);
            });
        },
    });
};
    

//------------------------------------------------------------------
//                  BOTONES
//------------------------------------------------------------------
$("#btn-modal-X").click(() => {
    modalOnOff();
});

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

$(document).ready(function () {
    $("#inputBuscar").on("keyup", function () {
      const buscarTexto = $(this).val(); // Obtiene el texto a buscar
  
      // Filtra las filas de la tabla solo en la columna "DNI"
      $("table tbody tr").filter(function () {
        const dni = $(this).find("td:nth-child(3)").text(); // Cambia 3 por el índice de la columna "DNI"
        // Compara si el DNI comienza con el texto buscado
        $(this).toggle(dni.startsWith(buscarTexto));
      });
    });
  });

//----------------------------------------------------------------  
//                     OTRAS FUNCIONES
//----------------------------------------------------------------


const erroresSoloLocalHost = ( error ) =>{
    window.isDevelopment = true ? console.log( error )  : "";
}

//-----------------------------------------------
//      Cierra la sesion de usuario
//-----------------------------------------------
$("#btmCerrarSesion").click(() => {
    alertaCerrarSistema();
});
