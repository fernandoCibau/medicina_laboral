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
    console.log ($(this).data('id-empresa'));
    // alert("HASTA  ACÁ LLEGUE");
});

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
            
            erroresSoloLocalHost(datos)
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
const cargarSelectMedicos = () =>{
    $('#selectMedicos').empty().append($('<option value="" selected>Selecciona un medico</option>') );

    $.ajax({
        url : "cargarSelectMedicos.php",
        method : "get",
        data : {medicos : 'medicos' },
        
        success:( resultado, estado )=>{

            try {
                const datos = JSON.parse(resultado);
                erroresSoloLocalHost(datos.datos);
                
                datos.datos.forEach( fila => {
                    $('#selectMedicos').append( $( `<option value="${fila['id']}"> ${fila['nombre']} </option>`) );
                });
                
            }catch (error) {
                console.log(resultado);
                console.error("Error al cargar select medicos del modal:", error);
                alert("Error al cargar datos en el select medicos. Consulta la consola para más detalles.");
            }
        }
    })
}
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
    if($('#selectEmpresas').val() == "" || $('#fecha').val() === "" || $('#selectEmpleados').val()  == "" || $('#horas-del-dia').val() == "" || $('#selectMedicos').val() == ""){
        $('#btnAgregarTurno').prop('disabled', true);
        $('#btnAgregarTurno').attr('class', 'btn-color-bloqueado');
    }else{
        $('#btnAgregarTurno').prop('disabled', false);
        $('#btnAgregarTurno').attr('class', 'btnAgregarTurno');
    }
}

const vaciarInputTurnos = () =>{
    // $('#selectEmpresas').val();
    $('#fecha').val(); 
    $('#selectEmpleados').val('');
    $('#horas-del-dia').val('');$('#selectMedicos').val('');
}


//----------------------------------------------------------------  
//                    CARGA INPUT HORARIOS
//----------------------------------------------------------------
//Select fecha del modal nuevo turno
$('#fecha').on( 'input', () =>{
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

                erroresSoloLocalHost(datos);

                datos.operacion  ?     Swal.fire({
                    // position: "top-end",
                    icon: "success",
                    title: datos.mensaje,
                    showConfirmButton: false,
                    timer: 1500
                }) 
                :  
                Swal.fire(datos.mensaje);
                cargarForm();
                
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
    cargarSelectMedicos();
    validarInputTurnos();
}

//-----------------------------------------------
//      Cierra la sesion de usuario
//-----------------------------------------------
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
