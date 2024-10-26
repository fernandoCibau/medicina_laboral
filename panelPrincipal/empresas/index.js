
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

                const boton = $("<button>").text("Ver").on( 'click', ()=>{
                    alert("Ver")
                } ) ;

                tr.append($("<td>").append(boton))

                const boton2 = $("<button>").text("Modificar").on( 'click', ()=>{
                    alert("Modificar")
                } ) ;
                
                tr.append($("<td>").append(boton2))

                const boton3= $("<button>").text("Eliminar").on( 'click', ()=>{
                    alert("Eliminar")
                } ) ;
                tr.append( $("<td>").append(boton3) );

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


// let ajaxUsuarioAlta = (formData) =>{
//     $.ajax({

//         url: "email.php",
//         method: "post",
//         data: formData,
//         contentType: false,
//         processData: false,

//         success: (resultado, estado) =>{


//             let datos = JSON.parse(resultado);

//             console.log(datos);

//             if(datos.rta){
//                 alert( datos.mensaje);
//                 // location.href="";
//             }else{
//                 alert(datos.error);
//             }

//         }

//     })
// }

//------------------------------------------------------------------
//                  BOTONES
//------------------------------------------------------------------
$("#btmCerrarSesion").click( ()=>{
    if(confirm("¿Confirmar?")){
        location.href="../../cerrarSesion.php";
    }
})


