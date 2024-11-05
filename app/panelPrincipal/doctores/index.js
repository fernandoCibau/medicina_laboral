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
                    <input type="text" name="${key}" value="${fila[key]}" required">
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
                // console.log(datos);
                
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

                    
                    //Boton Eliminar
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
                            if (  result.isConfirmed    ) {
                                eliminarDoctor(fila['id']) 

                                
                            }
                        });
                    }) ));

                    $("tbody").append(tr);
                })
                
            } catch (e) {
                alert('Ocurrio un error.');
                errores( e.message +  " | " + resultado)
            }
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
    $.ajax({
        url: "medicoBaja.php",  
        type: "post",
        data: { idDoctor: idDoctor },
        
        success: function(resultado) {
            
            try {

                const datos = JSON.parse(resultado);
                
                if (datos.operacion) {
                    Swal.fire({
                        title: "Se eliminó correctamente!",
                        text: "El medico fue eliminada.",
                        icon: "success" 
                    });  
                    cargarTabla() 
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Ocurrió un error al eliminar  el medico"
                    });
                    errores( e.message +  " | " + resultado)
                }
            } catch (e) {
                alert('Ocurrio un error.');
                errores( e.message +  " | " + resultado)
            }
        },
        error: function(xhr, status, error) {
            errores("Error en la solicitud AJAX:", error);
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

$("#btnNuevoDoctor").click( () =>{
    alert("FALTA HACER")
})