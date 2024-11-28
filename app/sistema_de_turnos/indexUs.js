
// ---------------------------------------------------------------
//                      NO ADMIN
// ---------------------------------------------------------------
$(document).ready( ()=>{
    window.isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    cargarForm();
});



// ---------------------------------------------------------------
//    BOTON VER TURNOS Y FUNCIONES
// ---------------------------------------------------------------

//Boton para abrir modal ver turnos empresa
$("#btnVerTurnos").click( function() {
    modalOnOff();
    const idEmpresa = $(this).data('id-empresa');

    $.ajax({
        url :'cargarTurnosU.php',
        method : 'get',
        data : { idEmpresa : idEmpresa },
        
        success : ( resultado, estado ) =>{

            try {
                const datos = JSON.parse(resultado);

                // console.log(datos.datos);

                $("tbody").empty();

                if (datos.datos.length == 0) {
                    $("tbody").text("No se encontraron turnos en la fecha seleccionada.");
                }
        
                datos.datos.forEach((fila) => {
                    const tr = $("<tr>");
                    
                    for (const key in fila) {
                        
                        if (key === "Medico") continue;

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
})
        // -----------------------------------------------------------------------------
        //    BOTON CAGAR SELECT Y FUNCIONES
        // -----------------------------------------------------------------------------

//Cargar el select empresa del modal turnos
const cargarSelectEmpresa = ( idEmpresa ) =>{
    $.ajax({
        url : "cargarSelectEmpresa.php",
        method : "get",
        data : {idEmpresa : idEmpresa },

        success:( resultado, estado )=>{

            try {
                const datos = JSON.parse(resultado);
                
                // $('#selectEmpresas').empty().append( $('<option value="" selected>Selecciona una empresa</option>'));

                $('#selectEmpleados').prop('disabled', false).append($('<option value="" selected>Selecciona un empleado</option>') );
                
                datos.datos.forEach( fila => {
                    $('#idEmpresa').remove();            
                    $('#form-nuevo-turno').append( $(`<input type="hidden" id="idEmpresa" name="idEmpresa" value="${fila['id']}">`) ); 
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

const cargarSelectEmpleados = ( idEmpresa ) =>{
    $.ajax({
    url : "cargarSelectEmpleados.php",
    method : "get",
    data : {idEmpresa : idEmpresa },
    
    success:( resultado, estado )=>{

        try {
            const datos = JSON.parse(resultado);
            
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

//Cargar el select medicos del modal turnos
// const cargarSelectMedicos = () =>{
//     $('#selectMedicos').empty().append($('<option value="" selected>Selecciona un medico</option>') );

//     $.ajax({
//         url : "cargarSelectMedicos.php",
//         method : "get",
//         data : {medicos : 'medicos' },
        
//         success:( resultado, estado )=>{

//             try {
//                 const datos = JSON.parse(resultado);
//                 erroresSoloLocalHost(datos.datos);
                
//                 datos.datos.forEach( fila => {
//                     $('#selectMedicos').append( $( `<option value="${fila['id']}"> ${fila['nombre']} </option>`) );
//                 });
                
//             } catch (e) {
//                 alert('Ocurrió un error al procesar la respuesta del servidor.');
//                 const error = e.message + " | " + resultado;
//                 erroresSoloLocalHost( error )
//             }
//         },
//         error: (jqXHR, textStatus, errorThrown) => {
//             alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
//             const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
//             erroresSoloLocalHost( error );
//     }})
    
// }


//----------------------------------------------------------------  
//                     OTRAS FUNCIONES
//----------------------------------------------------------------


const erroresSoloLocalHost = ( error ) =>{
    window.isDevelopment = true ? console.log( error )  : "";
}

//----------------------------------------------------------------  
//                     VALIDAR Y VACIAR FORM
//----------------------------------------------------------------
//Chequeo en el modal donde esta el formulario
$('#seccion-modal').on( 'click', ()=>{
    validarInputTurnos();
})

//Valida los input del modal nuevo turno para desbloquear boton
const validarInputTurnos = ( ) =>{
    $('#selectEmpresas').prop('disabled', true);
    if($('#selectEmpresas').val() == "" || $('#fecha').val() === "" || $('#selectEmpleados').val()  == "" || $('#horas-del-dia').val() == "" ){
        $('#btnAgregarTurno').prop('disabled', true);
        $('#btnAgregarTurno').attr('class', 'btn-color-bloqueado');
    }else{
        $('#btnAgregarTurno').prop('disabled', false);
        $('#btnAgregarTurno').attr('class', 'btnAgregarTurno');
    }
}

const vaciarInputTurnos = () =>{
    $('#selectEmpleados').val('');
    $('#fecha').val('dd/mm/aaaa'); 
    $('#horas-del-dia').val('');
    $('#horas-del-dia').prop('disabled', true);
    // $('#selectMedicos').val('');
}


//----------------------------------------------------------------  
//                    CARGA INPUT HORARIOS
//----------------------------------------------------------------
//Select fecha del modal nuevo turno
$('#fecha').on( 'input', () =>{
    if( $('#fecha').val() === '' ){
        $('#horas-del-dia').prop('disabled', true);
    }else{
        $('#horas-del-dia').prop('disabled', false);
    }
    buscarHorariosTurnos( $("#fecha").val() );
})

//Carga los turnos en el select de nuevo turno y bloquea los ya asignados
const buscarHorariosTurnos  = ( fecha ) =>{
    $.ajax({
        url : "buscarHorarios.php",
        method : "get",
        data : {fecha : fecha },
        
        success:( resultado, estado )=>{

            try {
                const datos = JSON.parse(resultado);
                // console.log(datos.datos);
                $("#horas-del-dia").empty();

                $("#horas-del-dia").append($(`<option value=''>-- : -- : --</option>`));

                for (let i = 0; i < 24; i++) {
                // Solo dos iteraciones para 0 y 30 minutos
                for (let j = 0; j <= 1; j++) {
                const minutos = j * 30; // 0 o 30 minutos
                const hora = `${i < 10 ? '0' : ''}${i}:${minutos < 10 ? '0' : ''}${minutos}:00`; // Formato correcto de hora

                let isDisabled = false;

                // Verificar si la hora está en los turnos
                datos.datos.forEach(turno => {
                    if (hora === turno['hora']) {
                        isDisabled = true; // Marcar como deshabilitada si coincide
                    }
                });

                // Agregar la opción
                if (isDisabled) {
                    $("#horas-del-dia").append(
                        $(`<option value="${hora}" class="disabled-option" disabled>${hora}</option>`)
                    );
                } else {
                    $("#horas-del-dia").append(
                        $(`<option value="${hora}">${hora}</option>`)
                    );
                }}}
            }catch (e) {
                alert('Ocurrió un error al procesar la respuesta del servidor.');
                const error = e.message +  " | " + resultado;
                erroresSoloLocalHost( error );
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
            alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
            const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
            erroresSoloLocalHost( error )
        }
    })
}

//----------------------------------------------------------------  
//        FORM GUARDAR TUNOS Y FUNCION
//----------------------------------------------------------------

$("#form-nuevo-turno").submit( e =>{
    e.preventDefault();
    const form =  $("#form-nuevo-turno")[0];
    let formData = new FormData(form);
    // console.log(formData.get('selectEmpresas'));
    vaciarInputTurnos();
    guardarNuevoTurno( formData );
});

//Guardar el turno en la base de datos
const guardarNuevoTurno = ( formData ) => {

    $.ajax({

        url: "guardarTurno.php",
        method: "post",
        data:  formData ,
        contentType: false,
        processData: false,

        success: (resultado, estado) => {
            
            try{
                let datos = JSON.parse( resultado);

                datos.operacion  ?     Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: datos.mensaje,
                    showConfirmButton: false,
                    timer: 1500
                }) 
                :  
                Swal.fire(datos.mensaje);
                // cargarForm();
                
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

const cargarForm = () =>{
    cargarSelectEmpresa( $("#selectEmpresas").data('id-empresa') );  
    cargarSelectEmpleados( $("#selectEmpresas").data('id-empresa') );  
    $('#horas-del-dia').prop('disabled', true);
    // cargarSelectMedicos();
    validarInputTurnos();
}

//-----------------------------------------------
//      Cierra la sesion de usuario
//-----------------------------------------------
$("#btmCerrarSesion").click(() => {
    alertaCerrarSistema()
});


//-----------------------------------------------
//      BOTON X DEL MODAL
//-----------------------------------------------
$('#btn-cerrar').click( ()=>{
    modalOnOff();
})


//----------------------------------------------------------------  
//          MODAL VER TURNOS
//----------------------------------------------------------------

const modalOnOff = () => {
    if ($("#seccion-modal-usuario").hasClass("on")) {
        $("#seccion-modal-usuario").attr("class", "seccion-modal-usuario off");
    } else {
        $("#seccion-modal-usuario").attr("class", "seccion-modal-usuario on");
    }
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
                Swal.fire(datos.mensaje)
                modalOnOff();
            } catch (e) {
                alert('Ocurrió un error al procesar la respuesta del servidor.');
                const error = e.message + " | " + resultado;
                erroresSoloLocalHost( error )
            }
        },
        error: (jqXHR, textStatus, errorThrown) => {
        alert('Ocurrió un error en la solicitud. Intenta de nuevo más tarde.');
        const error = ("Error en la solicitud AJAX:", textStatus, errorThrown);
        // erroresSoloLocalHost( error );
        }
    });
};


// const alertaBorrar = () =>{

//     const modal = 
//     `
//         <div id="alertModal" class="modal-overlay">
//             <div class="modal-container">
//                 <!-- Logo -->
//                 <div class="modal-logo">
//                     <img src="app/sistema_de_turnos/icon/bote-de-basura.png" alt="Logo">

//                 </div>
//                 <!-- Título y mensaje -->
//                 <div class="modal-title">¿Está seguro de que desea eliminar?</div>
//                 <div class="modal-message">¿Estás a punto de eliminar  un turno, continuar con esta acción?</div>
//                 <!-- Botones -->
//                 <div class="modal-buttons">
//                     <button class="modal-button" onclick="acceptAction()">Aceptar</button>
//                     <button class="modal-button cancel" onclick="cancelAction()">Cancelar</button>
//                 </div>
//             </div>
//         </div>
//     `

//     $('main').append(modal);

// }