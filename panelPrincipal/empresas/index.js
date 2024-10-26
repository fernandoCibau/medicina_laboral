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

let ajaxUsuarioAlta = (formData) =>{
    $.ajax({

        url: "email.php",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,

        success: (resultado, estado) =>{


            let datos = JSON.parse(resultado);

            console.log(datos);

            if(datos.rta){
                alert( datos.mensaje);
                // location.href="";
            }else{
                alert(datos.error);
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


