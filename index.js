



//-----------------------------------------------------------------
//                      FORM
//-----------------------------------------------------------------
$("#formSesion").submit( (e)=>{
    e.preventDefault();
    let form = $("#formSesion");
    let formData = new FormData(form[0]);
    ajaxAutenticacion(formData);
})

//-----------------------------------------------------------------
//                      FUNCIONES
//-----------------------------------------------------------------
let ajaxAutenticacion = (formData)=>{
    $.ajax({

        url: "autenticacion.php",
        method: "post",
        data:  formData ,
        contentType: false,
        processData: false,

        success: (resultado, estado) => {
            
            try{
                let datos = JSON.parse( resultado);

                console.log(datos)

                if( datos.operacion ){
                    location.href="./panelPrincipal";
                }
                else{
                    alert(datos.mensaje);
                }

            }catch (error) {
                console.log(resultado);
                console.error("Error en la autenticacion de los datos:", error);
                alert("Error en la autenticacion de datos. Consulta la consola para más detalles.");
            }

        }
    })
}


$('#btnRecuperarContrasenia').click( () =>{
    alert("FALTA  HACER")
})