// import { alertExitoso, alertMensaje } from './funcionesSweetAlert/sweetAlert.js';

// -----------------------------------------------
//                      INICIO
// -----------------------------------------------
$(document).ready( ()=>{
    eliminarAutomatico();
    setFechaActual();
    setHorasDelDia();
    matrizMes();
});

// -----------------------------------------------
//                 FUNCIONES
// -----------------------------------------------

////Consulta la cantidad de turnos en la BD
const consultaCantidadDeTurnos = (anioYMes, cantidadDeDias) =>{

    $.ajax({
        url: "consultaTurnos.php",
        method: "get",
        data:  {anioYMes: anioYMes, cantidadDeDias:cantidadDeDias} ,

        success: (resultado, estado) => {
            const listaDeTurnos = JSON.parse(resultado);
            console.log(listaDeTurnos);

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
        }

    });

};

// Establecer el valor del input de tipo month a la fecha actual
const setFechaActual = () => {
            const hoy = new Date();
            const año = hoy.getFullYear();
            const mes = String(hoy.getMonth() + 1);
            $('#mesInput').val(`${año}-${mes}`);
};

//Carga el SELECT con todos los horarios
const setHorasDelDia = () =>{
    
    for (let i = 0; i < 24; i++) {
        for (let j = 0; j < 6; j++) {
            
            const option = $(`<option value="${i < 10 ? 0 : ''}${ i }:${ j }0">  ${i < 10 ? 0 : ''}${ i }:${ j }0:00</option>`);
            
            $("#horas-del-dia").append( option );
        }
    }
}

//Carga la matriz del mes con todos los dias del mes
const matrizMes =   () =>{

    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const dias = [ "Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    let cont = 0;

    const anioYMes = $("#mesInput").val();
    const [ anio, mes ] = anioYMes.split("-");

    const cantidadDeDias = new Date(anio, mes, 0).getDate() ;
    const primerDiaMes    = new Date(anio, mes - 1, 1 ).getDay();
    const diaActual           =  new Date().getDate() ;
    const mesActual         =  new Date().getMonth() + 1 ; // empieza en 0
    const anioActual         =  new Date().getFullYear() ;

    $("#mes").empty();

    //carga los nombres de los dias
    for (let i = 0; i < dias.length; i++) {
        const divDias = $("<div>").attr("class", "contenedor-nombre-dias" );
        const pDia = $("<p>").append( dias[i] );
        divDias.append(pDia);
        $("#mes").append(divDias);
    }

    // carga los dias vacios
    for (let i = 0; i < primerDiaMes; i++) {
        let div  = $("<div>").attr("class", "contenedor-dias");
        $("#mes").append(div);
    }

    // carga los dias validos
    for (let i = 0; i < cantidadDeDias; i++) {
        cont++;
        let id = String(anio) + "-" + String(mes) + "-" + String(cont);
        let div  = $("<div>").attr("class", "contenedor-dias");
        div.attr("id", id);

        const p = $("<p>").text(cont);
        div.append(p);

        div.on("click",  function() {
            // alert(`id : ${id}` ); // Muestra el id del div clickeado
            cargarTablaTurnos(id);
            modalOnOff();
            $("#contenedor-fom").attr('class', 'contenedor-fom off')
        });

        //marcador del dia actual
        if( cont == diaActual && mes == mesActual && anio == anioActual ){
            div.css("background-color", "rgba(0, 128, 0, 0.479)");

            //HAY QUE CHEQUEAR SI SE DEJA --------------------------------------------------------------------------
            div.hover(
                function() { // Mouse enter
                    $(this).css("background-color", "rgba(0, 130, 0, 0.7)");// otra manera de cargar datos en una etiqueta
                },
                function() { // Mouse leave
                    $(this).css("background-color", "rgba(0, 120, 0, 0.479)");
                }
            );
        }

        $("#mes").append(div);
    }

    consultaCantidadDeTurnos(anioYMes, cantidadDeDias);
};

//Carga los turnos en la tabla del modal
const cargarTablaTurnos = (idDelDia) =>{
    $.ajax({
        url: "cargarTurno.php",
        method: "get",
        data:  {idDelDia:idDelDia} ,

        success: (resultado, estado) => {
            
            try{
                let datos = JSON.parse( resultado);

                console.log(datos)
                
                $("tbody").empty();
            
                datos.datos.forEach( fila => {
                    const tr = $("<tr>");
                    
                    for (const key in fila) {
                        const td = $("<td>");
                        td.text( fila[ key ]);
                        tr.append(td);
                    }

                    const botonEliminar = $("<img src='icon/bote-de-basura.png' class='btn-eliminar id='btn-eliminar'>").click( ()=>{
                        Swal.fire({
                            title: "¿Está seguro de que desea eliminar?",
                            showDenyButton: true,
                            confirmButtonText: "Eliminar",
                            denyButtonText: `No eliminar`
                        }).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                const fecha = fila['fecha']; 
                                const hora   =  fila['hora']; 
                                eliminarTurno(fecha, hora);
                            } else if (result.isDenied) {
                                alertInformar("Se ha cancelado la eliminacion");
                            }
                        });
                    });

                    tr.append($("<td>").append(botonEliminar));

                    $('tbody').append(tr);
                });
                
                
            }catch (error) {
                alert(datos.mensaje);
                console.log(resultado);
                console.error("Error al cargar los datos:", error);
                alert("Error al cargar los datos. Consulta la consola para más detalles.");
            }
        }
    })
};

const modalOnOff = () =>{
    if($("#seccion-modal").hasClass("on") ){
        $("#seccion-modal").attr("class","seccion-modal off");
        $("#seccion-mes").attr("class", "seccion-mes desbloqueado");
    }
    else{
        $("#seccion-modal").attr("class","seccion-modal on");
        $("#seccion-mes").attr("class", "seccion-mes bloqueado");
    }
};

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

                console.log(datos)

                datos.operacion  ? alertExitoso(datos.mensaje) :  alertMensaje(datos.mensaje);
                matrizMes();
                
            }catch (error) {
                console.log(resultado);
                console.error("Error al guardar los datos:", error);
                alert("Error al guardar los datos. Consulta la consola para más detalles.");
            }
        }
    })
};

//Eliminar turno
const eliminarTurno = ( fecha, hora ) =>{
    $.ajax({
        url:'eliminarTurno.php',
        method:'get',
        data:{fecha:fecha, hora:hora},

        success:(resultado, estado )=>{

            try {
                const datos = JSON.parse(resultado);
                console.log(datos);

                alertExitoso(datos.mensaje)
                cargarTablaTurnos(fecha);
                matrizMes();
                
            }catch (error) {
                console.log(resultado);
                console.error("Error al eliminar el turno:", error);
                alert("Error al eliminar el turno. Consulta la consola para más detalles.");
            }
        }
    });
};

//Eliminar automatico de  turnos
const eliminarAutomatico = () =>{
    
    $.ajax({
        url:'eliminarAuto.php',
        method: 'get',
        data: { dato:""},

        success:( resultado, status)=>{

            try {
                const datos = JSON.parse(resultado);
                console.log(datos);
            }catch (error) {
                console.log(resultado);
                console.error("Error al eliminar automaticamente los datos:", error);
                alert("Error al eliminar automatico de los datos. Consulta la consola para más detalles.");
            }
        }
    });
};

//Vaciar datos de modal turnos
const vaciarFormModal = () =>{
    $("input[name='nombre'], input[name='fecha'], select[name='horas-del-dia'] ").val(" ");
    setHorasDelDia();
};

//Cargar el select empresa del modal turnos
const cargarSelectEmpresa = () =>{
    $.ajax({
        url : "cargarSelectEmpresa.php",
        method : "get",
        data : {empresas:'empresas'},

        success:( resultado, estado )=>{

            try {
                const datos = JSON.parse(resultado);
                console.log(datos.datos);
                
                $('#selectEmpresas').append( $('<option value="" selected>Selecciona una empresa</option>'));

                $('#selectEmpleados').prop('disabled', true).append($('<option value="" selected>Selecciona un empleado</option>') );
                
                datos.datos.forEach( fila => {            
                    $('#selectEmpresas').append( $( `<option value="${fila['id']}">${fila['razon_social']}</option>`) );
                });

            }catch (error) {
                console.log(resultado);
                console.error("Error al cargar select empresas del modal:", error);
                alert("Error al cargar datos en el select empresas. Consulta la consola para más detalles.");
            }
        }
    })
}

//Cargar el select empleados del modal turnos
const cargarSelectEmpleados = ( idEmpresa ) =>{
    if ($('#selectEmpresas').val() === "") {
        $('#selectEmpleados').prop('disabled', true);
    }else{
        $('#selectEmpleados').prop('disabled', false);

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
                
            }catch (error) {
                console.log(resultado);
                console.error("Error al cargar select empleados del modal:", error);
                alert("Error al cargar datos en el select empleados. Consulta la consola para más detalles.");
            }
        }})
    }
}

// -----------------------------------------------
//    FUNCIONES SWEETALERT
// -----------------------------------------------

const alertExitoso = (mensaje) =>{
    Swal.fire({
        // position: "top-end",
        icon: "success",
        title: mensaje,
        showConfirmButton: false,
        timer: 1500
    });
}

const alertMensaje = (mensaje) =>{
    Swal.fire(mensaje);
}

const alertInformar = (mensaje) => {
    Swal.fire(mensaje, "", "info");
}

// -----------------------------------------------
//     BOTONES Y FORMULARIOS
// -----------------------------------------------

//Carga los datos del nuevo mes 
$("#btn-buscar").click( ()=>{
    matrizMes();
});

//Boton para abrir modal
$("#btn-nuevo-turno").click(() => {
    modalOnOff ();
    $("#contenedor-tabla").attr('class', 'contenedor-tabla off');
    cargarSelectEmpresa();
});

//Boton para cerrar modal
$("#btn-cerrar").click( ()=>{
    modalOnOff ();
    vaciarFormModal();
    $("#contenedor-tabla").attr('class', 'contenedor-tabla on')
    $("#contenedor-fom").attr('class', 'contenedor-fom on')
});

//Captura cada letra del input nombre del modal agenda                   //  <= FALTA TERMINAR LA CARGA AL HTML/MODAL
// $("#nombre").on( 'input', () =>{
//     const consulta = $('#nombre').val();
//     if( consulta.length >= 3 ){
//         console.log(consulta)
//         $.ajax({
//             url:'consulta.php',
//             method:'get',
//             data: {consulta:consulta},

//             success:(resultado, estado)=>{
//                 const datos = JSON.parse(resultado);
//                 console.log( datos);
//             }
//         });

//     }
// });

//Boton del formulario de turnos
$("#form-nuevo-turno").submit( e =>{
    e.preventDefault();
    const form =  $("#form-nuevo-turno")[0];

    let formData = new FormData(form);

    console.log( formData.get("nombre"));
    console.log( formData.get("horas-del-dia"));

    guardarNuevoTurno( formData );
});

$('#selectEmpresas').on( 'input', () =>{
    cargarSelectEmpleados( $('#selectEmpresas').val());
});







