// -----------------------------------------------
//                      INICIO
// -----------------------------------------------
$(document).ready(() => {
    cargarTabla( $('#idEmpresa').data('idEmpresa') );
});

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

//------------------------------------------------------------------
//                  FUNCIONES
//------------------------------------------------------------------

const cargarTabla = (idEmpresa = 0) => {
    $.ajax({
        url: "cargarTabla.php",
        method: "get",
        data: { idEmpresa: idEmpresa },

    success: (resultado, estado) => {

        try {
            
            let datos = JSON.parse(resultado);
            // console.log(datos);
            
            // Vaciar el contenido de la tabla antes de agregar nuevas filas
            $("tbody").empty();
            
            const datosMap = datos.datos.map((item) => ({
                id: item.id || "", // Manten el ID al principio si es importante
                empresa_nombre: item.empresa_nombre || "", // Nombre de la empresa
                legajo: item.legajo || "",
                dni: item.dni || "",
                apellido: item.apellido || "",
                nombre: item.nombre || "",
                // domicilio: item.domicilio || "",
                // fecha_nacimiento: item.fecha_nacimiento || "",
                // fecha_ingreso: item.fecha_ingreso || "",
                // categoria_nombre: item.categoria_nombre || "", // Nombre de la categoría
                // seccion_nombre: item.seccion_nombre || "", // Nombre de la sección
                // observaciones: item.observaciones || "",
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
                $("tbody").append(tr);
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
    }});
};



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
