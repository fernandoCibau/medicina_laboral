import { errores } from '../../funcion.js';
// -----------------------------------------------
//                      INICIO
// -----------------------------------------------
$(document).ready( ()=>{
    cargarTabla();
});


//------------------------------------------------------------------
//                  FORMULARIO y FUNCION MODIFICAR
//------------------------------------------------------------------

$("#formModificar").submit( e=>{
    e.preventDefault();
    let form = $("#formModificar");
    let formData = new FormData(form[0]);

    $.ajax({
        url: "modificarMedico.php",
        method: "POST",
        data: formData,
        contentType: false,
        processData: false,
    
        success: (resultado) => {
            try {
                const datos = JSON.parse(resultado);
                console.log(datos);
    
                if (datos.operacion) {

                    Swal.fire({
                        title: "Médico modificado",
                        text: "Los cambios fueron guardados con éxito.",
                        icon: "success"
                    }).then(() => {
                        modalOnOff();  
                        cargarTabla(); 
                    });
                } else {
                    Swal.fire("Error", datos.mensaje, "error");
                }
    
            } catch (e) {
                alert('Ocurrió un error al procesar la respuesta del servidor.');
                errores(e.message + " | " + resultado);
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
            errores("Error en la solicitud AJAX:", textStatus, errorThrown);
        }
    });
    
});

const modificarMedico = (fila) => {
    modalOnOff();
    $("#formModificar").empty(); // Descomentar para limpiar el contenedor

    const form = $("#formModificar");

    for (const key in fila) {
        if (key === 'id') {
            // form.append($(`<label for="${key}">${key}</label>`));
            form.append($(`<input type="hidden" name="${key}" value="${fila[key]}" >`));
        } else {
            form.append($(`
                <div class="contenedor-input ">
                    <label for="${key}">${key}</label>
                    <input type="text" name="${key}" value="${fila[key]}">
                </div>
            `));
        }
    }

    form.append(`
        <div id="modalButtons">
            <input type="submit" class="btn-primary" value="Modificar">
            <input type="button" id="cancelarBtn" class="btn-secondary" value="Cancelar">
        </div>
    `);

    $("#contenedorDatos").append(form);
};

//------------------------------------------------------------------
//                  FUNCIONES
//------------------------------------------------------------------


    const cargarTabla = () => {
    $.ajax({
        url: "cargarTabla.php",
        method: "get",
        data: { todos: "todos" },
        
        success: (resultado, estado) => {
            try {
                const datos = JSON.parse(resultado);
                console.log(datos);
                
                const datosMap = datos.datos.map(item => ({
                    nombre: item.nombre,
                    especialidad : item.especialidad,
                    matricula: item.matricula,
                    dni: item.dni,
                    apellido: item.apellido,
                    email :  item.email,
                    id: item.id
                }));
                
                $("tbody").empty();

                datosMap.forEach(fila => {
                    const tr = $("<tr>");
                    
                    for (let key in fila) {
                        if (key !== 'id') {
                            tr.append( $("<td>").text( fila[key] ) );
                        }
                    }

                    //Boton Modificar
                    tr.append(  $('<td>').append($("<img src='../../icon/editar.png'>").on( 'click', ()=>{
                        modificarMedico( fila );
                    } ) ) );

                    //Boton Eliminat
                    
                    tr.append( $('<td>').append( $("<img src='../../icon/borrar.png'>").on( 'click', ()=>{
                        Swal.fire({
                            title: "¿Está seguro de eliminar?",
                            text: "Está a punto de eliminar un medico.",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Confirmar, Eliminar al medico!"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                eliminarDoctor(fila['id'])
                                .then(() => {
                                    Swal.fire({
                                        title: "Se eliminó correctamente!",
                                        text: "El medico fue eliminada.",
                                        icon: "success"
                                    });
                                    cargarTabla(); // Recargar la tabla con los datos actualizados
                                })
                                .catch(() => {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Ocurrió un error al eliminar la empresa"
                                    });
                                });
                            }
                        });
                    }) ))

                    $("tbody").append(tr);
                })
            
            
            } catch (e) {
                alert('Ocurrio un error.');
                errores( e.message +  " | " + resultado)
            }

            //                 $("#tituloModal").text("Modificar Doctor");
            //                 modalOnOff();
                            
            //                 // Evento del botón Guardar Cambios
            //                 $("#guardarCambiosBtn").on("click", () => {
            //                     const datosActualizados = {
            //                         id: $("#inputId").val(),
            //                         matricula: $("#inputMatricula").val(),
            //                         dni: $("#inputDNI").val(),
            //                         apellido: $("#inputApellido").val(),
            //                         nombre: $("#inputNombre").val()
            //                     };
                        
            //                    
            //         });

            //         // Evento del botón Cancelar
            //         $("#cancelarBtn").on("click", () => {
            //             modalOnOff(); // Cerrar el modal sin guardar
            //         });
            //     });
            //     tr.append($("<td>").append(botonModificar));

            //     // Botón Eliminar Medico
            //     const botonEliminar = $("<img src='../../icon/borrar.png'>").on('click', () => {
                    
            //     });
            //     tr.append($("<td>").append(botonEliminar));

            //     $("tbody").append(tr);
            // });
        }
    });
};



//Abre y cierra el modal
const modalOnOff = () =>{
    if($("#contenedorModal").hasClass("on") ){
        $("#contenedorModal").attr("class","contenedor-modal off");
        $("table").attr("class", "desbloqueado");
        $("#secMenu").attr("class", "secMenu desbloqueado");
        $("header").attr("class", "desbloqueado");
    }
    else{
        $("#contenedorModal").attr("class","contenedor-modal on");
        $("table").attr("class", "bloqueado");
        $("#secMenu").attr("class", "secMenu bloqueado");
        $("header").attr("class", "bloqueado");
    }
};



const eliminarDoctor = (idDoctor) => {
    return $.ajax({
        url: "bajaDoctor.php",  // Asegúrate de ajustar la ruta correctamente
        type: "POST",
        data: { id: idDoctor },
        dataType: "json",
        success: function(response) {
            if (response.operacion) {
                return true;  // Se usará en el bloque .then() de la promesa en la función principal
            } else {
                console.error("Error en el servidor:", response.mensaje);
                return false;
            }
        },
        error: function(xhr, status, error) {
            console.error("Error en la solicitud AJAX:", error);
            return false;
        }
    });
};
//------------------------------------------------------------------
//                  BOTONES
//------------------------------------------------------------------
$("#btmCerrarSesion").click( ()=>{
    if(confirm("¿Confirmar?")){
        location.href="../../cerrarSesion.php";
    }
})

$("#btn-modal-X").click( () => {
    modalOnOff();
})








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