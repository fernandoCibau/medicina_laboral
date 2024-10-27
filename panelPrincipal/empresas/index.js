
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

const cargarTabla = () =>{

    $.ajax({
        url: "cargarTabla.php",
        method: "get",
        data: {todos:"todos"},

        
        success: (resultado, estado) =>{
            
            let datos = JSON.parse(resultado);
            
            console.log(datos);
            
            const datosMap = datos.datos.map(item => ({
                razon_social : item.razon_social,
                cuit : item.cuit,
                domicilio : item.domicilio,
                telefono : item.telefono,
                email : item.email
            }));
            
            console.log(datosMap)
            
            datosMap.forEach( fila=> {
                const tr = $("<tr>");
                
                for( key in fila ){
                    const td = $("<td>");
                    td.append( fila[key]);
                    tr.append(td);
                    
                }
                
                // Boton ver datos completos
                const botonVer= $("<img src='../../icon/ojo.png'>").on( 'click', ()=>{
                    modalOnOff();

                    const contenedorLista = $("<div>").attr('class', 'contendor-lista');
                    
                    const divRazon_social = $("<div>").attr('class', 'contenedor-item');
                    const divCuit = $('<div>').attr('class', 'contenedor-item');
                    const divDomicilio = $('<div>').attr('class', 'contenedor-item');
                    const divTelefono = $('<div>').attr('class', 'contenedor-item');
                    const divEmail = $('<div>').attr('class', 'contenedor-item');
                    
                    // Agregar contenido a cada div
                    divRazon_social.append($("<span>Razón Social: </span>"), $(`<span>${ fila['razon_social']}</span>`));
                    divCuit.append($("<span>CUIT: </span>"), $(`<span>${ fila['cuit']}</span>`));
                    divDomicilio.append($("<span>Domicilio: </span>"), $(`<span>${ fila['domicilio']}</span>`));
                    divTelefono.append($("<span>Teléfono: </span>"), $(`<span>${ fila['telefono']}</span>`));
                    divEmail.append($("<span>Email: </span>"), $(`<span>${ fila['email']}</span>`));
                    
                    // Agregar todos los divs al contenedor de la lista
                    contenedorLista.append(divRazon_social, divCuit, divDomicilio, divTelefono, divEmail);
                    
                    // Limpiar el contenido anterior y agregar el nuevo
                    $("#contenedorDatos").empty().append(contenedorLista);
                } ) ;

                tr.append($("<td>").append(botonVer));

                const botonModificar =  $("<img src='../../icon/editar.png'>").on( 'click', ()=>{
                    $("#contenedorDatos").empty()
                    modalOnOff();
                } ) ;
                
                tr.append($("<td>").append(botonModificar));

                // Boton modificar empresa
                const botonEliminar=  $("<img src='../../icon/borrar.png'>").on( 'click', ()=>{
                    Swal.fire({
                        title: "Esta seguro de eliminar?",
                        text: "Esta a punto de eliminar la empresa",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Confirmar, Eliminar la empresa!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if ( eliminarEmpresa() ){
                                Swal.fire({
                                title: "Se elimino correctamente!",
                                text: "La empresa fue eliminada.",
                                icon: "success"
                                });
                            }else{
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Ocurrio un Error al eliminar la empresa",
                                    // footer: '<a href="#">Why do I have this issue?</a>'
                                });
                            }
                        }
                    });
                } ) ;
                tr.append( $("<td>").append(botonEliminar ) );

                $("tbody").append(tr);


            });

            // if(datos.rta){
            //     alert( datos.mensaje);
            //     // location.href="";
            // }else{
            //     alert(datos.error);
            // }

        }
    })
};

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



const eliminarEmpresa = () =>{
    const resultado = confirm("SIMULADOR DE RESPUESTA BD ");

    // Verifica la respuesta del usuario
    if (resultado) {
        return true;
        // Aquí puedes agregar el código para eliminar el elemento
    } else {
        return false;
    }
}