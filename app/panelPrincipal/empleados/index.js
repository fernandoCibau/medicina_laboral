
// -----------------------------------------------
//                      INICIO
// -----------------------------------------------
$(document).ready( ()=>{
    cargarTabla();
});


//------------------------------------------------------------------
//                  FORMULARIO
//------------------------------------------------------------------

$("#formAlta").submit( e=>{
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

            const datosMap = datos.datos.map(item => ({
                id: item.id || '',  // Manten el ID al principio si es importante
                empresa_nombre: item.empresa_nombre || '',  // Nombre de la empresa
                legajo: item.legajo || '',            
                dni: item.dni || '',            
                apellido: item.apellido || '',          
                nombre: item.nombre || '',           
                domicilio: item.domicilio || '',          
                fecha_nacimiento: item.fecha_nacimiento || '',            
                fecha_ingreso: item.fecha_ingreso || '',            
                categoria_nombre: item.categoria_nombre || '',  // Nombre de la categoría            
                seccion_nombre: item.seccion_nombre || '',  // Nombre de la sección            
                observaciones: item.observaciones || ''      
            }));
            
            datosMap.forEach(fila => {
                const tr = $("<tr>");
                // Crear una celda para cada campo excepto el ID
                for (let key in fila) {
                    if (key !== 'id' && key !== 'fecha_nacimiento' && key !== 'fecha_ingreso' && key !== 'domicilio' && key !== 'observaciones') {
                        const td = $("<td>").text(fila[key]);
                        tr.append(td);
                    }
                }
                
                // Botón Ver Empleados
                const botonVer = $("<img src='../../icon/ojo.png'>").on('click', () => {
                    empleadosDeEmpresa(fila['id']);
                });
                tr.append($("<td>").append(botonVer));
            
                // Botón Modificar Empleado
                const botonModificar = $("<img src='../../icon/editar.png'>").on('click', () => {
                    $("#contenedorDatos").empty();
                    
                    // Crear los inputs con los valores de la fila seleccionada
                    $("#contenedorDatos").append(`
                        <input type="text" id="inputId" value="${fila['id']}" hidden>

                        <label for="inputIdEmpresa">Empresa</label>
                        <input type= "number" id="idEmpresa" value = "${fila['id_empresa']}" hidden>
                        <input type="text" id="inputIdEmpresa" value="${fila['empresa_nombre']}" readonly>
                        
                        <label for="inputLegajo">Legajo</label>
                        <input type="text" id="inputLegajo" value="${fila['legajo']}">
                        
                        <label for="inputDNI">DNI</label>
                        <input type="text" id="inputDNI" value="${fila['dni']}">
                        
                        <label for="inputApellido">Apellido</label>
                        <input type="text" id="inputApellido" value="${fila['apellido']}">
                        
                        <label for="inputNombre">Nombre</label>
                        <input type="text" id="inputNombre" value="${fila['nombre']}">
                        
                        <label for="inputDomicilio">Domicilio</label>
                        <input type="text" id="inputDomicilio" value="${fila['domicilio']}">
                                                
                        <label for="inputFechaNac">Fecha Nac:</label>
                        <input type="date" id="inputFechaNac" value="${fila['fecha_nacimiento']}">
                                                
                        <label for="inputFechaIng">Fecha Ing:</label>
                        <input type="date" id="inputFechaIng" value="${fila['fecha_ingreso']}">
                                                
                        <label for="inputCategoria">Categoria</label>
                        <input type= "number" id="idCategoria" value = "${fila['id_categoria']}" hidden>
                        <input type="text" id="inputCategoria" value="${fila['categoria_nombre']}" readonly>
                                                
                        <label for="inputSeccion">Seccion</label>
                        <input type= "number" id="idSeccion" value = "${fila['id_seccion']}" hidden>
                        <input type="text" id="inputSeccion" value="${fila['seccion_nombre']}" readonly>
                                                
                        <label for="inputObservaciones">Observaciones</label>
                        <input type="text" id="inputObservaciones" value="${fila['observaciones']}">
                        
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
                            id_categoria: $("#id_categoria").val(),
                            id_seccion: $("#id_seccion").val(),
                            observaciones: $("#inputObservaciones").val(),
                            id_empresa: $("#idEmpresa").val()
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
                                        icon: "success"
                                    }).then(() => {
                                        modalOnOff();  // Cerrar modal
                                        cargarTabla(); // Recargar la tabla con los datos actualizados
                                    });
                                } else {
                                    Swal.fire("Error", resultado.mensaje, "error");
                                }
                            },
                            error: (xhr, status, error) => {
                                console.error("Error en la solicitud AJAX:", error);
                                Swal.fire("Error", "Ocurrió un problema al guardar los cambios.", "error");
                            }
                        });
                    });

                    // Evento del botón Cancelar
                    $("#cancelarBtn").on("click", () => {
                        $("#contenedorDatos").empty();
                        modalOnOff(); // Cerrar el modal sin guardar
                    });
                });
                tr.append($("<td>").append(botonModificar));
                
                // Botón Eliminar Empresa
                const botonEliminar = $("<img src='../../icon/borrar.png'>").on('click', () => {
                    Swal.fire({
                        title: "¿Está seguro de eliminar?",
                        text: "Está a punto de eliminar un empleado",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Confirmar"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            eliminarEmpleado(fila['id'])
                                .then(() => {
                                    Swal.fire({
                                        title: "Se eliminó correctamente!",
                                        text: "La empresa fue eliminada.",
                                        icon: "success"
                                    });
                                    cargarTabla(); // Recargar la tabla con los datos actualizados
                                })
                                .catch(() => {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Ocurrió un error al eliminar el empleado"
                                    });
                                });
                        }
                    });
                });
                tr.append($("<td>").append(botonEliminar));

                $("tbody").append(tr);
            });
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

//Consulta de datos completos de la empresa
const empleadosDeEmpresa = (idEmpresa) =>{
    
    $.ajax({
        url : "cargarTabla.php",
        method : "get",
        data : {idEmpresa : idEmpresa},

        success: (resultado, estado)=>{

            try {
                const datos = JSON.parse(resultado);
                
                modalOnOff();
                const tabla = $('<table>').attr('class', 'tabla-empleados');
                const tr = $('<tr>');


                /* Carga el thead */
                for( key in datos.datos[0] ){
                    tr.append( $("<th>").text( key ) );
                }
                const thead = $("<thead>").append(tr);
                
                
                const tbody = $("<tbody>");
                // //Carga el tbody
                datos.datos.forEach( fila => {
                    const tr = $("<tr>");
                    for( key in fila ){
                        tr.append( $("<td>").text( fila[key] ) ); 
                    }
                    tbody.append( tr );
                });
                
                $("#tituloModal").text('Empleados')
                tabla.append(  thead, tbody ); 
                $("#contenedorDatos").empty().append(tabla);



                
                
                console.log (datos)
            
            }catch (error) {
                console.log(resultado);
                console.error("Error en la carga de empleados:", error);
                alert("Error en la carga de datos. Consulta la consola para más detalles.");
            }

        }



    })
}

const eliminarEmpleado = (idEmpleado) => {
    return $.ajax({
        url: "bajaEmpleado.php",  // Asegúrate de ajustar la ruta correctamente
        type: "POST",
        data: { id: idEmpleado },
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



//Buscador

$(document).ready(function() {
    $('#inputBuscar').on('keyup', function() {
        const buscarTexto = $(this).val(); // Obtiene el texto a buscar

        // Filtra las filas de la tabla solo en la columna "DNI"
        $('table tbody tr').filter(function() {
            const dni = $(this).find('td:nth-child(3)').text(); // Cambia 3 por el índice de la columna "DNI"
            // Compara si el DNI comienza con el texto buscado
            $(this).toggle(dni.startsWith(buscarTexto));
        });
    });
});






//Funcion de agregar empleado

const botonAgregar = $("#agregarEmpleado").on("click", () => {

    $("#tituloModal").text("Agregar Empleado");
    modalOnOff();
    $("#contenedorDatos").empty();
    $("#contenedorDatos").append(`
            <div class="contenedor-input">
                <label for="selectEmpresas" require>Empresas</label>
                <select name="selectEmpresas" id="selectEmpresas"></select>
            </div>
            
            <label for="altaLegajo">Legajo</label>
            <input type="text" id="altaLegajo">

            <label for="altaDNI">DNI</label>
            <input type="text" id="altaDNI" required>
            
            <label for="altaApellido">Apellido</label>
            <input type="text" id="altaApellido" required>
            
            <label for="altaNombre">Nombre</label>
            <input type="text" id="altaNombre" required>
            
            <label for="altaDomicilio">Domicilio</label>
            <input type="text" id="altaDomicilio">
                                                    
            <label for="altaFechaNac">Fecha Nac:</label>
            <input type="date" id="altaFechaNac" required>
                                                    
            <label for="altaFechaIng">Fecha Ing:</label>
            <input type="date" id="altaFechaIng">
                                                    
            <label for="altaCategoria">Categoria</label>
            <input type="text" id="altaCategoria">
                                                    
            <label for="altaSeccion">Seccion</label>
            <input type="text" id="altaSeccion">
                                                    
            <label for="altaObservaciones">Observaciones</label>
            <input type="text" id="altaObservaciones">
            
            <div id="modalButtons">
                <button id="agregarBtn" class="btn btn-primary">Agregar Empleado</button>
                <button id="cancelarBtn" class="btn btn-secondary">Cancelar</button>
            </div>
        
        `);

    // Evento del botón Guardar Cambios
    $("#agregarBtn").on("click", () => {
        const datosActualizados = {
            legajo: $("#inputLegajo").val(),
            dni: $("#inputDNI").val(),
            apellido: $("#inputApellido").val(),
            nombre: $("#inputNombre").val(),
            domicilio: $("#inputDomicilio").val(),
            fecha_nac: $("#inputFechaNac").val(),
            fecha_ing: $("#inputFechaIng").val(),
            observaciones: $("#inputObservaciones").val(),
            id_categoria: null, // Asigna null directamente
            id_seccion: null    // Asigna null directamente
        };
    
                // Realizar la solicitud final para dar de alta al empleado
                return $.ajax({
                    url: "altaEmpleado.php",
                    method: "POST",
                    data: datosActualizados
                });
            }).done(response => {
            const resultado = JSON.parse(response);
            if (resultado.operacion) {
                console.log("El empleado se cargó con éxito.");
                Swal.fire({
                    title: "Empleado Agregado.",
                    text: "El empleado fue agregado con éxito.",
                    icon: "success",
                }).then(() => {
                    modalOnOff(); // Cerrar modal
                    cargarTabla(); // Recargar la tabla con los datos actualizados
                });
            } else {
                Swal.fire("Error", resultado.mensaje, "error");
            }
        }).fail((xhr, status, error) => {
            Swal.fire("Error", "Ocurrió un problema durante el proceso.", "error");
            console.error("Error en la solicitud AJAX:", error);
        });
    });

    // Evento del botón Cancelar
    $("#cancelarBtn").on("click", () => {
        modalOnOff(); // Cerrar el modal sin guardar
    });




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
                
                $('#selectEmpresas').empty().append( $('<option value="" selected>Selecciona una empresa</option>'));

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