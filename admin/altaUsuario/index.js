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

        url: "altaUsuario.php",
        method: "post",
        data: formData,
        contentType: false,
        processData: false,

        success: (resultado, estado) =>{
            const datos = JSON.parse(resultado);

            console.log(datos);


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


